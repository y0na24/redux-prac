import React from 'react'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'task/completed':
      const newArray = [...state]
      const elementIndex = newArray.findIndex((el) => el.id === action.payload.id)
      newArray[elementIndex].completed = true
      return newArray

    default:
      break
  }
}

const createStore = (reducer, initialState) => {
  let state = initialState
  let listeners = []

  const getState = () => {
    return state
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  const subscribe = (listener) => {
    listeners.push(listener)
  }

  return { getState, dispatch, subscribe }
}

const store = createStore(taskReducer, initialState)

const App = () => {
  const [state, setState] = React.useState()
  const taskList = store.getState()

  React.useEffect(() => {
    store.subscribe(() => setState(store.getState()))
  })

  const completeTask = (taskId) => {
    store.dispatch({ type: 'task/completed', payload: { id: taskId } })
  }
}

console.log(store)
