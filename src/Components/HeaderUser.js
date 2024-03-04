import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const HeaderUser = () => {
  const navigate = useNavigate()

  const handleUserProfileButton = () => {

    navigate("/user/edit_user")
}
  return (
    <div>
        <Button color="inherit">Dashboard</Button>
        <Button onClick={handleUserProfileButton} color="inherit">User</Button>
    </div>
  )
}

export default HeaderUser
