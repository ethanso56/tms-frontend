import React, { useEffect, useState } from 'react'
import api from '../api/baseapi'
import useAuth from '../hooks/useAuth';
import AddUser from './AddUser';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];




const AdminUserManagementPage = () => {
  const [data, setData] = useState(null);
  const { auth } = useAuth()

  const fetchData = async () => {

    // get data from backend
    const accessToken = auth?.accessToken
  
    try {
      const res = await api.get('/admin/all_users', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("retrived user data")
      console.log(res.data)
      setData(res.data)
  
    } catch (err) {
      console.log(err.response.data.message)
      console.log(err.response.status)
      console.log(err.response.headers)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const rows = data

  const handleStatus = (r) => {
    console.log(r)
  }

  const handleEdit = (r) => {
    console.log(r)
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
        <Button color="inherit">Add User</Button>
        <Button color="inherit">Create Group</Button>
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
          {rows.map((row) => (
            <TableRow
              key={row.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">---</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.groups}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => handleStatus(row)}>
                  Enable
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>
                  Edit
                </Button>
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
