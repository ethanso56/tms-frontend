import React from 'react'
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormControlLabel, FormGroup } from '@mui/material';


const AddUser = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [groups, setGroups] = useState('')

    const handleConfirm = () => {

    }

    const handleCancel = () => {

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
                type="groups"
                id="groups"
                onChange={(e) => setGroups(e.target.value)}
            />
        </Grid>
        <Grid item xs={4}>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Enabled" />
            </FormGroup>
        </Grid>
        <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={(e) => handleConfirm(e)}>
                Confirm
            </Button>
            <Button variant="contained" color="red" onClick={(e) => handleCancel(e)}>
                Cancel
            </Button>
        </Grid>
    </Grid>
  )
}

export default AddUser
