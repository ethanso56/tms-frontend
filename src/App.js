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
  const [loggedIn, setLoggedIn] = useState(false); 
  const [loggedInUserGroups, setLoggedInUserGroups] = useState('')

  const addFlashMessage = (msg) => {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <div>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} addFlashMessage={addFlashMessage} />
        <FlashMessages messages={flashMessages} />

        <Routes>
            <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
    
            <Route exact path="/" element={<HomePage loggedIn={loggedIn} />} />
           
            <Route path="/user/edit_user" element={<UpdateUserProfilePage />} />

            <Route path="/admin/all_users" element={<AdminUserManagementPage addFlashMessage={addFlashMessage} />} />
        
        </Routes>

    </div>
  )
}

export default App
