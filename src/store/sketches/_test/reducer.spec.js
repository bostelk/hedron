import test from 'tape'
import deepFreeze from 'deep-freeze'
import sketchesReducer from '../reducer'
import { sketchNodeOpenedToggle } from '../actions'
import { returnsPreviousState } from '../../../testUtils'

returnsPreviousState(sketchesReducer)

test('(Reducer) sketchesReducer - Adds new sketch on SKETCH_CREATE', (t) => {
  const originalState = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
    },
  }

  deepFreeze(originalState)

  const expectedState = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
    },
    UID0: {
      moduleId: 'swirly',
      title: 'Swirly',
      paramIds: ['UID1', 'UID2'],
    },
  }

  const actual = sketchesReducer(originalState, {
    type: 'SKETCH_CREATE',
    payload: {
      id: 'UID0',
      sketch: {
        moduleId: 'swirly',
        title: 'Swirly',
        paramIds: ['UID1', 'UID2'],
      },
    },
  })

  t.deepEqual(actual, expectedState, 'Adds new item')
  t.end()
})

test('(Reducer) sketchesReducer - Removes sketch on SKETCH_DELETE', (t) => {
  let originalState, expectedState, actual

  originalState = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
    },
  }

  deepFreeze(originalState)

  expectedState = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
    },
  }

  actual = sketchesReducer(originalState, {
    type: 'SKETCH_DELETE',
    payload: {
      id: 's02',
    },
  })

  t.deepEqual(actual, expectedState, 'Removes item')

  expectedState = {}

  actual = sketchesReducer(actual, {
    type: 'SKETCH_DELETE',
    payload: {
      id: 's01',
    },
  })

  t.deepEqual(actual, expectedState, 'Removes item')

  t.end()
})

test('(Reducer) sketchesReducer - Replaces sketches on SKETCHES_REPLACE_ALL', (t) => {
  let originalState, actual

  const newSketches = {
    sAA: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p11', 'p2'],
    },
    sBB: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
    },
    sCC: {
      moduleId: 'swirly',
      title: 'Swirly 2',
      paramIds: ['p55', 'p04'],
    },
  }

  originalState = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
    },
  }

  deepFreeze(originalState)

  actual = sketchesReducer(originalState, {
    type: 'SKETCHES_REPLACE_ALL',
    payload: {
      sketches: newSketches,
    },
  })

  t.deepEqual(actual, newSketches, 'Replaces all sketches')

  t.end()
})

test('(Reducer) sketchesReducer - Replaces sketches on SKETCHES_REPLACE_ALL', (t) => {
  let originalState, actual

  const newSketches = {
    sAA: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p11', 'p2'],
    },
    sBB: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
    },
    sCC: {
      moduleId: 'swirly',
      title: 'Swirly 2',
      paramIds: ['p55', 'p04'],
    },
  }

  originalState = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
    },
  }

  deepFreeze(originalState)

  actual = sketchesReducer(originalState, {
    type: 'SKETCHES_REPLACE_ALL',
    payload: {
      sketches: newSketches,
    },
  })

  t.deepEqual(actual, newSketches, 'Replaces all sketches')

  t.end()
})

test('(Reducer) sketchesReducer - SKETCH_NODE_OPENED_TOGGLE', (t) => {
  let original, actual, expected

  original = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
      openedNodes: {},
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
      openedNodes: {
        param: 'p03',
      },
    },
  }

  expected = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
      openedNodes: {
        param: 'p01',
      },
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
      openedNodes: {
        param: 'p03',
      },
    },
  }

  deepFreeze(original)

  actual = sketchesReducer(original, sketchNodeOpenedToggle('s01', 'p01', 'param'))

  t.deepEqual(actual, expected, 'Adds param id when undefined')

  expected = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
      openedNodes: {
        param: 'p02',
      },
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
      openedNodes: {
        param: 'p03',
      },
    },
  }

  actual = sketchesReducer(actual, sketchNodeOpenedToggle('s01', 'p02', 'param'))

  t.deepEqual(actual, expected, 'Changes param id when different')

  expected = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
      openedNodes: {
        param: 'p02',
      },
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
      openedNodes: {
        param: undefined,
      },
    },
  }

  actual = sketchesReducer(actual, sketchNodeOpenedToggle('s02', 'p03', 'param'))

  t.deepEqual(actual, expected, 'Switches param id to undefined if receives the same id')

  expected = {
    s01: {
      moduleId: 'cubey',
      title: 'Cubey 1',
      paramIds: ['p01', 'p02'],
      openedNodes: {
        param: 'p02',
        shot: 'sh01',
      },
    },
    s02: {
      moduleId: 'swirly',
      title: 'Swirly 1',
      paramIds: ['p03', 'p04'],
      openedNodes: {
        param: undefined,
      },
    },
  }

  actual = sketchesReducer(actual, sketchNodeOpenedToggle('s01', 'sh01', 'shot'))

  t.deepEqual(actual, expected, 'Handles adding shot id')

  t.end()
})
