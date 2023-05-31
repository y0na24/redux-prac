import React from 'react'
import ReactDOM from 'react-dom/client'
import { uniqueId } from 'lodash'

import { completeTask, getTasksLoadingStatus, getTasks, loadTasks, taskDeleted, titleChanged, addNewTask } from './store/task'
import store from './store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getErrors } from './store/error'

const App = () => {
  const taskList = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getErrors())
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(loadTasks())
  }, [])

  return isLoading ? (
    <h1>Loading</h1>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(addNewTask(uniqueId("task_")))}>Add new task</button>
      <ul>
        {taskList.map((task) => {
          return (
            <li key={task.id}>
              <p>{task.title}</p>
              <p>{`Completed: ${task.completed}`}</p>
              <button onClick={() => dispatch(completeTask(task.id))}>Complete</button>
              <button onClick={() => dispatch(titleChanged(task.id))}>Change title</button>
              <button onClick={() => dispatch(taskDeleted(task.id))}>Delete task</button>
              <hr />
            </li>
          )
        })}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
