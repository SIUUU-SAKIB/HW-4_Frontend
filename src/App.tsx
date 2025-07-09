import React, { useEffect } from 'react'
import logo from "./assets/FINAL LOGO.png"
import axios from 'axios'
const App = () => {
  useEffect(() => {
    axios.get(`http://localhost:3000/books`).then(res => console.log(res.data))
  }, [])
  return (
    <>
      <div className='bg-[var(--color-bg-card)] font-primarycd '>THIS IS A LIBRARY MANAGEMENT APPLICATION</div>
      <img src={logo} />
    </>
  )
}

export default App