import { useState } from 'react'
import './Popup.css'
import Day from '../Day'
import Priority from '../../Components/Priority'

function Popup() {
  const [count, setCount] = useState(0)

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Be Vietnam Pro' rel='stylesheet'></link>
      <section>
        <div id = "same-line">
        <p>Task Name </p> 
        </div>
        <input type="text" id = "ip" placeholder="Clean Room" required/>

        
        <div id = "same-line">
          <p>Time </p>
        </div>
        <input type="text" id = "ip" placeholder="1:00" required/>


        <div id = "same-line">
          <p>Priority </p>
        </div>
          <Priority />

        <div id = "same-line">
          <p>Days to work </p>
        </div>
          <Day />
        
        <button>add task</button>
      </section>
     
    </>

  )
}

export default Popup
