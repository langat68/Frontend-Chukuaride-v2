import { useState } from 'react'
import Hero from './components/hero'
import Navbar from './components/Navbar'
import HowItWorks from './components/Howitworks'
import Fleet from './components/Fleet'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Hero/>
      <HowItWorks/>
      <Fleet/>
      
    </>
  )
}

export default App
