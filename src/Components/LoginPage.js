import React from 'react'
import { useState, useEffect, useContext } from 'react'
import StateContext from '../context/StateContext'
import DispatchContext from '../context/DispatchContext'
import { Navigate } from 'react-router-dom'
import api from '../api/baseapi'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const LoginPage = () => {

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log({
          username: data.get('username'),
          password: data.get('password'),
        });

        const userData = {
            username: data.get('username'),
            password: data.get('password')
        }

        try {
            const res = await api.post('/auth/login', userData)
            console.log("User logged in")
            console.log(res.data)

            appDispatch({ type: "login" })
            appDispatch({ type: "setIsAdmin", value: res?.data?.isAdmin })
            appDispatch({ type: "setUsernameOfLoggedIn", value: res?.data?.others.email })
            appDispatch({ type: "setEmailOfLoggedIn", value: res?.data?.others.email })
            appDispatch({ type: "flashMessage", value: "User logged in" })

            setUsername('')
            setPassword('')

        } catch (err) {
            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.status)
            console.log(err.response.headers)
            if (!err?.response) {
                appDispatch({ type: "flashMessage", value: "No Server Response" })
            } else if (err.response?.status === 404) {
                appDispatch({ type: "flashMessage", value: "User not found" })
            } else if (err.response?.status === 400) {
                appDispatch({ type: "flashMessage", value: "Wrong password" })
            } else if (err.response?.status === 401) {
                appDispatch({ type: "flashMessage", value: "User has been disabled" })
            } else {
                appDispatch({ type: "flashMessage", value: "Login Failed" })
            }
        }
      };
    

  return (
    appState.loggedIn ? <Navigate to="/" /> :
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus 
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default LoginPage
