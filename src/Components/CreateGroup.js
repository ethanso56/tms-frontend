import React from 'react'
import { useState } from 'react';
import api from '../api/baseapi'
import useAuth from '../hooks/useAuth';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateGroup = ({ setDataChanged, handleCancelCreateGroup, addFlashMessage }) => {

    const { auth } = useAuth()

    const [group, setGroup] = useState('')

    const handleConfirm = async () => {
        const accessToken = auth?.accessToken

        const groupObj = {
            groupname: group
        }

        try {
            const res = await api.post('/admin/create_group', groupObj, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
              })
            console.log("Created group")
            setDataChanged(true)
            addFlashMessage("Created group")
            handleCancelCreateGroup()
            console.log(res.data)
            setGroup('')
        } catch (err) {
            console.log(err.response.data.message)
            console.log(err.response.status)
            console.log(err.response.headers)

            if (!err?.response) {
                addFlashMessage('No Server Response')
            }   else if (err.response?.status === 409) {
                addFlashMessage("Groupname cannot be more than 50 characters.")
            }   else {
                addFlashMessage("Error creating group")
            }   
        }     
    }

  return (
    <Grid container spacing={2}>
        <Grid item xs={4}>
            <TextField
                 margin="normal"
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
