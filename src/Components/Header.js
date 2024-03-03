import React from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api/baseapi'
import useAuth from '../hooks/useAuth';
import HeaderAdmin from './HeaderAdmin';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


// use state to check if it user or admin that logs in then show corrent component

const Header = ({ loggedIn, setLoggedIn, addFlashMessage }) => {
  const { setAuth } = useAuth()

  const isAdmin = () => {
    
  }

  const handleLogout = async () => {

    try {
      const res = await api.post('/auth/logout')
      console.log("Logged Out")
      console.log(res.data)
      setLoggedIn(false)
      setAuth({})
      addFlashMessage("User logged out")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    loggedIn ? 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TMS
          </Typography>
          <HeaderAdmin />
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    : <Navigate to="/login" />
  )
}

export default Header
