import React from 'react'
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom'

const HeaderAdmin = () => {
    const navigate = useNavigate()

    const handleUserManagementButton = () => {
        navigate("/admin/all_users")
    }

  return (
    <div>
        <Button color="inherit">Dashboard</Button>
        <Button onClick={handleUserManagementButton} color="inherit">User management</Button>
        <Button color="inherit">Admin</Button>
        <Button color="inherit">Logout</Button>
    </div>
  )
}

export default HeaderAdmin
