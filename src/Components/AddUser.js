import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/baseapi'
import axios, { all } from 'axios'
import DispatchContext from '../context/DispatchContext';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormControlLabel, FormGroup } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const AddUser = ({ allGroups, setDataChanged, handleCancelAddUser }) => {
    const navigate = useNavigate()
    const appDispatch = useContext(DispatchContext)

    axios.defaults.withCredentials = true

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [groups, setGroups] = useState('')
    const [status, setStatus] = useState(true)

    const handleConfirm = async () => {

        if (username == "" || password == "") {
            appDispatch({ type: "flashMessage", value: "Username and Password cannot be empty" })
            return
        }

        const userObj = {
            username: username,
            password: password,
            email: email,
            groups: groups,
            status: status
        }

        try {
            const res = await api.post('/admin/create_User', userObj)

            console.log("Created user")
            console.log(res.data)

            appDispatch({ type: "flashMessage", value: "Created user" })

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
                appDispatch({ type: "flashMessage", value: "No Server Response" })
            }  else if (err.response?.status === 409) {
                appDispatch({ type: "flashMessage", value: "Username or Email does not meet validation" })
            }  else if (err.response?.status === 400) {
                appDispatch({ type: "flashMessage", value: "Password must be between 8 to 10 characters and must contain at least one alphabet, number and special character" })
            }  else if (err.response?.status === 401) {
                appDispatch({ type: "flashMessage", value: "Unauthorised" })

                // set to logout
                appDispatch({ type: "logout" })
                appDispatch({ type: "setIsAdmin", value: false })
                appDispatch({ type: "setUsernameOfLoggedIn", value: "" })
                navigate('/login')
            } else {
                appDispatch({ type: "flashMessage", value: "Error creating user" })
            }   
        }
    }

    const handleSelectedGroups = (e, groupArr) => {
        // groupArr is an array of groupnames
        console.log(groupArr)
        const groupNames = groupArr.map(group => group.groupname)
        setGroups(groupNames.join(', '))
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
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={allGroups}
                      getOptionLabel={(group) => group.groupname}
                      onChange={handleSelectedGroups}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Groups"
                          placeholder="Groups"
                        />
                      )}
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
