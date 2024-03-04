import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const HeaderUser = () => {

  const handleUserProfileButton = () => {
    navigate("/user/edit_user")
}
  return (
    <div>
        <Button color="inherit">Dashboard</Button>
        <Button color="inherit">User</Button>
        <Button onClick={handleUserProfileButton} color="inherit">User</Button>
        <Button color="inherit">Logout</Button>
    </div>
  )
}

export default HeaderUser
