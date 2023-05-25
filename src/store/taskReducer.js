import { taskDeleted, taskUpdated } from './actionTypes'

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case taskUpdated:
      const newArray = [...state]
      const index = newArray.findIndex((elem) => elem.id === action.payload.id)
      newArray[index] = { ...newArray[index], ...action.payload }
      return newArray

    case taskDeleted:
      const updatedArr = [...state]
      return updatedArr.filter((task) => task.id !== action.payload.id)

    default:
      return state
  }
}

export default taskReducer
