import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './task'
import errorReducer from './error'
import { logger } from './middleware/logger'

const store = configureStore({
  reducer: { errors: errorReducer, tasks: taskReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
