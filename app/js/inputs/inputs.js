import SketchesStore from '../stores/SketchesStore';
import AudioBandsStore from '../stores/AudioBandsStore';
import AudioInputs from './AudioInputs';
import MidiInputs from './MidiInputs';
import * as Modifiers from './modifiers';

import * as SketchActions from '../actions/SketchActions';

class Inputs {

	constructor() {

		this.inputs = {}
		this.sketches = SketchesStore.getAll();
		this.keys = AudioBandsStore.getKeys();

		AudioInputs.on('updated', this.parseInputs.bind(this));
		MidiInputs.on('message', this.onMidiInput.bind(this));

	}

	parseInputs() {

		this.inputs = {}

		var audioData = AudioInputs.getData();

		for (let i = 0; i < this.keys.length; i++) {
			this.inputs[this.keys[i]] = audioData[i];
		}
		
	    Object.keys(this.sketches).map((sketchId) => {

	    	const sketchInputs = this.sketches[sketchId].data.inputs;

	    	if (sketchInputs) {

		    	if (sketchInputs.audio) {

					this.parseAudioInputs(sketchId, sketchInputs.audio);
					
				}

				// if (this.sketches[i].inputs.nodes) {
				// 	this.parseNodeInputs(this.sketches[i].nodes, this.sketches[i].inputs.nodes, this.sketches[i].params);
				// }

			}

	    });

	}

	onMidiInput(id, val) {

		for (const sketchId of Object.keys(this.sketches)) {

			const sketchInputs = this.sketches[sketchId].data.inputs;

			if (sketchInputs.midi && sketchInputs.midi[id]) {

				const param = sketchInputs.midi[id].param;
				const modifier = sketchInputs.midi[id].modifier;
			//	const node = sketch.inputs.midi[id].node;

				if (param) {

					if (modifier) {
						SketchActions.editSketchParamModifier(sketchId, param, modifier, val);
					} else {
						SketchActions.editSketchParam(sketchId, param, val);
					}
					
				}

				// if (node) {
				// 	this.sketches[i].nodes[node].modifier.val = val; 
				// }

			}

		}

	}

	parseAudioInputs(sketchId, inputs) {

		for (const param of Object.keys(inputs)) {

			let val = this.inputs[inputs[param]];
			const modifierArray = this.sketches[sketchId].data.params[param].modifiers;

			if (modifierArray) {
				val = this.modifyInput(val, modifierArray);
			}

			SketchActions.editSketchParam(sketchId, param, val);

		}

	}

	modifyInput(value, modifierArray) {

		for (let i = 0; i < modifierArray.length; i++) {

			const m = parseFloat(modifierArray[i].m);
			const modifyFunction = Modifiers[modifierArray[i].id];

			if (modifyFunction) {
				value = modifyFunction(value, m);
			} else {
				console.error('Modifier not recognised: ', modifierArray[i].id)
			}
			
		}

		return value;

	}
	
}

export default new Inputs;