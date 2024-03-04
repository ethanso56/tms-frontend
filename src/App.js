import React, { useState } from 'react'
import Header from './Components/Header'
import LoginPage from './Components/LoginPage'
import HomePage from "./Components/HomePage"
import UpdateUserProfilePage from "./Components/UpdateUserProfilePage"
import AdminUserManagementPage from "./Components/AdminUserManagementPage"
import FlashMessages from './Components/FlashMessages'
import { Routes, Route } from 'react-router-dom'



const App = () => {
  const [flashMessages, setFlashMessages] = useState([])

  const addFlashMessage = (msg) => {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <div>
        <Header />
        <FlashMessages messages={flashMessages} />

        <Routes>
            <Route path="/login" element={<LoginPage />} />
    
            <Route exact path="/" element={<HomePage />} />
           
            <Route path="/user/edit_user" element={<UpdateUserProfilePage addFlashMessage={addFlashMessage} />} />

            <Route path="/admin/all_users" element={<AdminUserManagementPage addFlashMessage={addFlashMessage} />} />
        
        </Routes>

    
    </div>
  )
}

export default App
