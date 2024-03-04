import React from 'react'
import { useState, useEffect, useRef } from 'react'
// import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import api from '../api/baseapi'
// import Cookies from 'js-cookie'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';

const defaultTheme = createTheme();


const LoginPage = ({ setUsernameOfLoggedIn, loggedIn, setLoggedIn, setIsAdmin }) => {
    const errRef = useRef();

    // const { setAuth } = useAuth()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    // axios.defaults.withCredentials = true

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

            // const accessToken = res?.data?.accessToken
            // const accessToken = Cookies.get('jwt')
            // console.log("accesstoken frontend: " + accessToken)
            // const groups = res?.data?.others.groups
            // setAuth({ username, password, groups, accessToken })
            
            setUsernameOfLoggedIn(res?.data?.others.username)
            setIsAdmin(res?.data?.isAdmin)

            setUsername('')
            setPassword('')
            setLoggedIn(true)

        } catch (err) {
            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.status)
            console.log(err.response.headers)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 404) {
                setErrMsg('User not found');
            } else if (err.response?.status === 400) {
                setErrMsg('Wrong password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
      };
    

  return (
    loggedIn ? <Navigate to="/" /> :
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
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
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
