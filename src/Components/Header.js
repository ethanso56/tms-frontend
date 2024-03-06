import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api/baseapi'
import StateContext from '../context/StateContext';
import DispatchContext from '../context/DispatchContext';
import HeaderAdmin from './HeaderAdmin';
import HeaderUser from './HeaderUser';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {

  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const handleLogout = async () => {

    try {
      const res = await api.post('/auth/logout')
      console.log("Logged Out")
      console.log(res.data)

      appDispatch({ type: "logout" })
      appDispatch({ type: "setIsAdmin", value: false })
      appDispatch({ type: "setUsernameOfLoggedIn", value: "" })
      appDispatch({ type: "setEmailOfLoggedIn", value: "" })
      appDispatch({ type: "flashMessage", value: "User logged out" })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    appState.loggedIn ? 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TMS
          </Typography>

          { appState.isAdmin 
            ? <HeaderAdmin />
            : <HeaderUser />}
          
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    : <Navigate to="/login" />
  )
}

export default Header
