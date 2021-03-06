import getSketchesPath from '../selectors/getSketchesPath'
import { projectError } from '../store/project/actions'

import * as engine from './'
import * as renderer from './renderer'

export const handleAddScene = (action) => {
  const { sceneId } = action.payload
  engine.addScene(sceneId)
}

export const handleRemoveScene = (action) => {
  const { sceneId } = action.payload
  engine.removeScene(sceneId)
}

export const handleAddSketch = (action) => {
  const { sceneId, sketchId, moduleId } = action.payload
  engine.addSketchToScene(sceneId, sketchId, moduleId)
}

export const handleDeleteSketch = (action) => {
  const { sceneId, sketchId } = action.payload
  engine.removeSketchFromScene(sceneId, sketchId)
}

export const handleInitiateScenes = (action, store) => {
  try {
    const state = store.getState()
    const sketchesPath = getSketchesPath(state)
    engine.loadSketchModules(sketchesPath)
    engine.initiateScenes()
  } catch (error) {
    console.error(error)
    store.dispatch(projectError(`Failed to initiate sketches: ${error.message}`))
  }
}

export const handleShotFired = (action) => {
  engine.fireShot(action.payload.sketchId, action.payload.method)
}

export const handleSaveImage = (action) => {
  renderer.saveSequence()
}
export const handleRandomizeAll = (action, store) => {
  let keys = Object.keys(store.getState().sketches)
  for (let i = 0; i < keys.length; i++) {
    engine.fireShot(keys[i], 'randomize')
  }
}

export default (action, store) => {
  switch (action.type) {
    case 'ENGINE_SCENE_SKETCH_ADD':
      handleAddSketch(action, store)
      break
    case 'ENGINE_SCENE_SKETCH_DELETE':
      handleDeleteSketch(action, store)
      break
    case 'ENGINE_SCENE_ADD':
      handleAddScene(action, store)
      break
    case 'ENGINE_SCENE_REMOVE':
      handleRemoveScene(action, store)
      break
    case 'PROJECT_LOAD_SUCCESS':
      handleInitiateScenes(action, store)
      break
    case 'NODE_SHOT_FIRED':
      handleShotFired(action, store)
      break
    case 'SAVE_IMAGE':
      handleSaveImage(action, store)
      break
    case 'RANDOMIZE_ALL':
      handleRandomizeAll(action, store)
      break
  }
}
