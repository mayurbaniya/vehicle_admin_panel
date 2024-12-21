import { useState } from 'react'
import './App.css'
import { Login } from './components/auth/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
       <Route path="/" element={<Login/>} />
       <Route path='/dashboard' element={<Dashboard /> }/>
    </Routes>
  )
}

export default App
