import React from 'react'
import { useState, useContext } from 'react';
import DispatchContext from '../context/DispatchContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/baseapi'
import axios from 'axios'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateGroup = ({ setDataChanged, handleCancelCreateGroup }) => {

    const appDispatch = useContext(DispatchContext)
    const navigate = useNavigate()

    const [group, setGroup] = useState('')

    axios.defaults.withCredentials = true

    const handleConfirm = async () => {

        if (group === '' || group === " ") {
            appDispatch({ type: "flashMessage", value: "Groupname cannot be empty" })
            return 
        }

        const groupObj = {
            groupname: group
        }

        try {
            const res = await api.post('/admin/create_group', groupObj)
            
            console.log("Created group")
            setDataChanged(true)

            appDispatch({ type: "flashMessage", value: "Created group" })

            handleCancelCreateGroup()
            console.log(res.data)
            setGroup('')
        } catch (err) {
            console.log(err.response.data.message)
            console.log(err.response.status)
            console.log(err.response.headers)

            if (!err?.response) {
                appDispatch({ type: "flashMessage", value: "No Server Response" })
            } else if (err.response?.status === 409) {
                appDispatch({ type: "flashMessage", value: "Groupname cannot be more than 50 characters" })
            } else if (err.response?.status === 400) {
                appDispatch({ type: "flashMessage", value: "Group already exists" })
            } else if (err.response?.status === 401) {
                appDispatch({ type: "flashMessage", value: "Unauthorised" })

                // set to logout
                appDispatch({ type: "logout" })
                appDispatch({ type: "setIsAdmin", value: false })
                appDispatch({ type: "setUsernameOfLoggedIn", value: "" })
                navigate('/login')
            } else {
                appDispatch({ type: "flashMessage", value: "Error creating group" })
            }   
        }     
    }

  return (
    <Grid container spacing={2}>
        <Grid item xs={4}>
            <TextField
                 margin="normal"
                 required
                 name="group"
                 label="Group name"
                 type="text"
                 id="group"
                onChange={(e) => setGroup(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={(e) => handleConfirm(e)}>
                Confirm
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelCreateGroup}>
                Cancel
            </Button>
        </Grid>
    </Grid>
  )
}

export default CreateGroup
