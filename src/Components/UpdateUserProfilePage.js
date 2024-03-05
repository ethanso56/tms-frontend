import React, { useState, useContext } from 'react'
import api from '../api/baseapi'
import StateContext from '../context/StateContext';
import DispatchContext from '../context/DispatchContext';
// import useAuth from '../hooks/useAuth';
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

const UpdateUserProfilePage = () => {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // const { auth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const accessToken = auth?.accessToken

    if (password != confirmPassword) {
      // addFlashMessage("Password does not match Confirm Password.")
      appDispatch({ type: "flashMessage", value: "Password does not match Confirm Password" })
      return
    }

    const data = new FormData(e.currentTarget);
        
    console.log({
      username: appState.usernameOfLoggedIn,
      email: data.get('email'),
      password: data.get('password'),
    });

    const userData = {
      username: appState.usernameOfLoggedIn,
      email: data.get('email'),
      password: data.get('password')
    }

    try {
      const res = await api.patch('/user/edit_user', userData)

      // const res = await api.patch('/edit_user', userData, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`
      //   }
      // })

      console.log("User Profile updated")
      console.log(res.data)

      // addFlashMessage("User Profile updated")
      // setEmailOfLoggedIn(email)

      appDispatch({ type: "flashMessage", value: "User Profile updated" })
      appDispatch({ type: "setUsernameOfLoggedIn", value: email })

      setEmail('')
      setPassword('')
    } catch (err) {
      console.log(err.response.data.message)
      console.log(err.response.status)
      console.log(err.response.headers)
      if (!err?.response) {
        // addFlashMessage('No Server Response')
        appDispatch({ type: "flashMessage", value: "No Server Response" })

      } else if (err.response?.status === 409) {
        // addFlashMessage("Password or Email does not meet validation.")
        appDispatch({ type: "flashMessage", value: "Password or Email does not meet validation" })

      } else {
        // addFlashMessage("Error editing user")
        appDispatch({ type: "flashMessage", value: "Error editing user" })

      }   
    }
  }

  return (
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
          User Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus 
            defaultValue={appState.emailOfLoggedIn}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default UpdateUserProfilePage
