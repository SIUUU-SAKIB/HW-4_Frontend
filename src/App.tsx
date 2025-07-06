import React, { useEffect } from 'react'
import icon from "./assets/mainIcon.png"
import axios from 'axios'
const App = () => {
  useEffect(() => {
   axios.get(`http://localhost:3000/books`).then(res => console.log(res.data))
  }, [])
  return (
    <>
    <div>THIS IS A LIBRARY MANAGEMENT APPLICATION</div>
    <img src={icon}/>
    </>
  )
}

export default App