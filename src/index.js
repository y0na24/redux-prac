import React from 'react'
import ReactDOM from 'react-dom/client'
import { taskCompleted, taskDeleted, titleChanged } from './store/task'
import store from './store/store'

const App = () => {
  const [state, setState] = React.useState()

  const taskList = store.getState()

  React.useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId))
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {taskList.map((task) => {
          return (
            <li key={task.id}>
              <p>{task.title}</p>
              <p>{`Completed: ${task.completed}`}</p>
              <button onClick={() => completeTask(task.id)}>Complete</button>
              <button onClick={() => changeTitle(task.id)}>Change title</button>
              <button onClick={() => deleteTask(task.id)}>Delete task</button>
              <hr />
            </li>
          )
        })}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)
