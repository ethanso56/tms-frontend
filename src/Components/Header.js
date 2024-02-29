import React from 'react'
import useAuth from '../hooks/useAuth';
import HeaderAdmin from './HeaderAdmin';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


// use state to check if it user or admin that logs in then show corrent component

const Header = () => {
  const { auth } = useAuth()

  const isAdmin = () => {
    
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TMS
          </Typography>
          <HeaderAdmin />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
