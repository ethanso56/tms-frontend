import React from 'react'
import Header from './Components/Header'
import LoginPage from './Components/LoginPage'
import HomePage from "./Components/HomePage"
import UpdateUserProfilePage from "./Components/UpdateUserProfilePage"
import AdminUserManagementPage from "./Components/AdminUserManagementPage"
import { Routes, Route } from 'react-router-dom'



const App = () => {
  return (
    <div>
        <Header />

        <Routes>
            <Route path="/login" element={<LoginPage />} />
    
            <Route exact path="/" element={<HomePage />} />
           
            <Route path="/user/edit_user" element={<UpdateUserProfilePage />} />

            <Route path="/admin/all_users" element={<AdminUserManagementPage />} />
        
        </Routes>

    
    </div>
  )
}

export default App
