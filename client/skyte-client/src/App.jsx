import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>
      <p className='text-3xl font-bold underline text-teal-300'>
        Skyte
      </p>
    </>
  )
}

export default App
