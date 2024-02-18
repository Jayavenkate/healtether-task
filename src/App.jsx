
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Chat from './Chat'
import { Login } from './Login'



function App() {

  return (
    <div>

      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
