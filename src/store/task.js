import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const index = state.findIndex((elem) => elem.id === action.payload.id)
      state[index] = { ...state[index], ...action.payload }
    },
    remove(state, action) {
      return state.filter((task) => task.id !== action.payload.id)
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove } = actions

export const taskCompleted = (id) => {
  return update({ id, completed: true })
}

export const titleChanged = (id) => {
  return update({ id, title: `New title for ${id}` })
}

export const taskDeleted = (id) => {
  return remove({ id })
}

export default taskReducer
