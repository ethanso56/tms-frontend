import React, { useContext } from 'react'
import StateContext from '../context/StateContext'
import { Navigate } from 'react-router-dom'

const HomePage = ({ loggedIn }) => {
  const appState = useContext(StateContext)

  return (
    appState.loggedIn ? <main /> : <Navigate to="/login" />
  )
}

export default HomePage
