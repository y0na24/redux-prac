import React from 'react'
import ReactDOM from 'react-dom/client'
import * as actions from './store/actions'
import initiateStore from './store/store'

const store = initiateStore()

const App = () => {
  const [state, setState] = React.useState()

  const taskList = store.getState()

  React.useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId))
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
