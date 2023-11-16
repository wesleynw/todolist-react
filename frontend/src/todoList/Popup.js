import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Popup() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body>
        <p>Task Name: </p>
        <p>Due date: </p>
        <p>Priority: </p>
        <p>Add to days: </p>
        <Day />
        <button>add task</button>
      </body>
    </>
  )
}

export default Popup
