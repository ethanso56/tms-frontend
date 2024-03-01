import React from 'react'
import { useState } from 'react';
import api from '../api/baseapi'
import useAuth from '../hooks/useAuth';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormControlLabel, FormGroup } from '@mui/material';


const AddUser = ({ setDataChanged, handleCancelAddUser, addFlashMessage }) => {

    const { auth } = useAuth()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [groups, setGroups] = useState('')
    const [status, setStatus] = useState(true)

    const handleConfirm = async () => {
        const accessToken = auth?.accessToken

        const userObj = {
            username: username,
            password: password,
            email: email,
            groups: groups,
            status: status
        }

        try {
            const res = await api.post('/admin/create_User', userObj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
              })
            console.log("Created user")
            console.log(res.data)
            addFlashMessage("Created user")
            setDataChanged(true)
            handleCancelAddUser()
            setUsername('')
            setPassword('')
            setEmail('')
            setGroups('')
            setStatus(true)
        } catch (err) {
            console.log(err.response.data.message)
            console.log(err.response.status)
            console.log(err.response.headers)
            if (!err?.response) {
                addFlashMessage('No Server Response')
            }   else if (err.response?.status === 409) {
                addFlashMessage("Username or Password or Email does not meet validation.")
            }   else {
                addFlashMessage("Error creating user")
            }   
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus 
                    onChange={(e) => setUsername(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    margin="normal"
                    required
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    margin="normal"
                    name="groups"
                    label="Groups"
                    type="text"
                    id="groups"
                    onChange={(e) => setGroups(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setStatus(e.target.checked)} />} label="Is Enabled" />
                </FormGroup>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="primary" onClick={(e) => handleConfirm(e)}>
                    Confirm
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCancelAddUser}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddUser
