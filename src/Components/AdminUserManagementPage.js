import React, { useEffect, useState } from 'react'
import api from '../api/baseapi'
import useAuth from '../hooks/useAuth';
import AddUser from './AddUser';
import CreateGroup from './CreateGroup';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const AdminUserManagementPage = ({ addFlashMessage }) => {
  const [userData, setUserData] = useState(null);
  const [groupData, setGroupData] = useState(null)
  const [addUser, setAddUser] = useState(false)
  const [createGroup, setCreateGroup] = useState(false)
  const [editRows, setEditRows] = useState([])  
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [groups, setGroups] = useState('')
  const [dataChanged, setDataChanged] = useState(false)

  const { auth } = useAuth()

  const fetchData = async () => {
    const accessToken = auth?.accessToken
  
    try {
      const resUsers = await api.get('/admin/all_users', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("retrived user data")
      console.log(resUsers.data)
      setUserData(resUsers.data)

      const resGroup = await api.get('/admin/all_groups', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("retrived group object data")
      console.log(resGroup.data)
      setGroupData(resGroup.data)

      setDataChanged(false)
  
    } catch (err) {
      console.log(err.response.data.message)
      console.log(err.response.status)
      console.log(err.response.headers)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dataChanged])

  if (!userData) {
    return <div>Loading...</div>
  }

  const rows = userData

  const handleStatusToggle = async (row) => {

    const accessToken = auth?.accessToken

    const userObj = {
      username: row.username,
      status: !row.status
    }

    try {
      const res = await api.patch('/admin/edit_user_status', userObj, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      addFlashMessage("Edited user status")
      setDataChanged(true)
      console.log("edited user")
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data.message)
      console.log(err.response.status)
      console.log(err.response.headers)
      if (!err?.response) {
        addFlashMessage('No Server Response')
      } else {
        addFlashMessage("Error editing user status")
      }   
    }
  }

  const handleEdit = (index) => {
    const newEditRows = [...editRows];
    newEditRows[index] = true;
    setEditRows(newEditRows);
  }

  const handleSaveEdit = async (row, index) => {

    const accessToken = auth?.accessToken

    let userObj = {}

    if (password == "") {
      userObj = {
        username: row.username,
        password: null,
        email: email,
        groups: groups,
      }
    } else {
      userObj = {
        username: row.username,
        password: password,
        email: email,
        groups: groups,
      }
    }

    try {
     
      const res = await api.patch('/admin/edit_user', userObj, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      addFlashMessage("Edited user")
      setDataChanged(true)
      setPassword('')
      setEmail('')
      setGroups('')
      console.log("edited user")
      console.log(res.data)
      
      // change display back to normal
      const newEditRows = [...editRows];
      newEditRows[index] = false;
      setEditRows(newEditRows);
  
    } catch (err) {
      console.log(err.response.data.message)
      console.log(err.response.status)
      console.log(err.response.headers)
      if (!err?.response) {
        addFlashMessage('No Server Response')
      }   else if (err.response?.status === 409) {
          addFlashMessage("Password or Email does not meet validation.")
      }   else {
          addFlashMessage("Error editing user")
      }   
    }
  }

  const handleSelectedGroups = (e, groupArr) => {
    // value is an array of groupnames
    console.log(groupArr)
    const groupNames = groupArr.map(group => group.groupname)
    setGroups(groupNames.join(', '))
  }

  const handleDefaultGroupsValue = (groups) => {
    setGroups(groups)
    return (groups.split(',').map(groupName => {
      return { groupname: groupName }
    }))
  }

  const handleAddUser = () => {
    setAddUser(true)
  }

  const handleCreateGroup = () => {
    setCreateGroup(true)
  }

  const handleCancelAddUser = () => {
    setAddUser(false)
  }
  
  const handleCancelCreateGroup = () => {
    setCreateGroup(false)
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>User Management</h1>
        <div>
            {addUser && <AddUser setDataChanged={setDataChanged} handleCancelAddUser={handleCancelAddUser} addFlashMessage={addFlashMessage} />}
            {createGroup && <CreateGroup setDataChanged={setDataChanged} handleCancelCreateGroup={handleCancelCreateGroup} addFlashMessage={addFlashMessage} />}
            {!addUser && !createGroup && (
                <div>
                    <Button color="primary" onClick={handleAddUser}>Add User</Button>
                    <Button color="primary" onClick={handleCreateGroup}>Create Group</Button>
                </div>
            )}
        </div>
        
      </Box>
     
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Groups</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              {
                editRows[index] ? 
                <>
                  <TableCell align="right">
                    <TextField
                      margin="normal"
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></TextField>
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      margin="normal"
                      name="email"
                      label="email"
                      type="email"
                      id="email"
                      defaultValue={row.email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                  </TableCell>
                  <TableCell align="right">
              
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={groupData}
                      getOptionLabel={(group) => group.groupname}
                      defaultValue={() => handleDefaultGroupsValue(row.groups)}
                      onChange={handleSelectedGroups}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Multiple values"
                          placeholder="Groups"
                        />
                      )}
                    />
                  </TableCell>
                </>
                :  
                <>
                  <TableCell align="right">---</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.groups}</TableCell>
                </>
              }

              <TableCell align="right">{row.status ? "Active" : "Disabled"}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => handleStatusToggle(row)}>
                  {row.status ? "Disable" : "Enable"}
                </Button>

                { editRows[index] ? <Button variant="contained" color="primary" onClick={() => handleSaveEdit(row, index)}>
                    Save
                  </Button>
                    : <Button variant="contained" color="primary" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>             
                }         
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default AdminUserManagementPage
