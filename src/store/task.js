import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './error'

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const index = state.entities.findIndex((elem) => elem.id === action.payload.id)
      state.entities[index] = { ...state.entities[index], ...action.payload }
    },
    remove(state, action) {
      state.entities = state.entities.filter((el) => el.id !== action.payload.id)
    },
    add(state, action) {
      state.entities.push(action.payload)
    },
    taskRequested(state, action) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, add, received, taskRequested, taskRequestFailed } = actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(received(data))
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}

export const addNewTask = (id) => (dispatch) => {
  dispatch(add({ id, title: 'New task', completed: false }))
}

export const titleChanged = (id) => (dispatch) => {
  dispatch(update({ id, title: `New title for ${id}` }))
}

export const taskDeleted = (id) => (dispatch) => {
  dispatch(remove({ id }))
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
