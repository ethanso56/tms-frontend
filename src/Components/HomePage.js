import React from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = ({ loggedIn }) => {
  return (
    loggedIn ? <main /> : <Navigate to="/login" />
  )
}

export default HomePage
