import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './task'
import { logger } from './middleware/logger'
import { thunk } from './middleware/thunk'

const store = configureStore({
  reducer: taskReducer,
  middleware: [logger, thunk],
})

export default store
