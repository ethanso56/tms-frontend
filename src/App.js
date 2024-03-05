import React, { useState, useReducer } from 'react'
import Header from './Components/Header'
import LoginPage from './Components/LoginPage'
import HomePage from "./Components/HomePage"
import UpdateUserProfilePage from "./Components/UpdateUserProfilePage"
import AdminUserManagementPage from "./Components/AdminUserManagementPage"
import FlashMessages from './Components/FlashMessages'

import FlashMessageContext from './context/FlashMessagContext'
import StateContext from './context/StateContext'
import DispatchContext from './context/DispatchContext'
import { useImmerReducer } from 'use-immer'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  // const [flashMessages, setFlashMessages] = useState([])
  // const [usernameOfLoggedIn, setUsernameOfLoggedIn] = useState('')
  // const [emailOfLoggedIn, setEmailOfLoggedIn] = useState('')
  // const [loggedIn, setLoggedIn] = useState(false); 
  // const [isAdmin, setIsAdmin] = useState(false)

  // const addFlashMessage = (msg) => {
  //   setFlashMessages(prev => prev.concat(msg))
  // }

  const initialState = {
    loggedIn: false,
    usernameOfLoggedIn: '',
    emailOfLoggedIn: '',
    isAdmin: false,
    flashMessages: []
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "setUserNameOfLoggedIn":
        draft.usernameOfLoggedIn = action.value
        return
      case "setEmailOfLoggedIn":
        draft.emailOfLoggedIn = action.value
        return
      case "setIsAdmin":
        draft.isAdmin = action.value
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <div>
        <FlashMessageContext.Provider value={{}}>
          <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>

              <FlashMessages messages={state.flashMessages} />
              {/* <Header setUsernameOfLoggedIn={setUsernameOfLoggedIn} loggedIn={loggedIn} setLoggedIn={setLoggedIn} addFlashMessage={addFlashMessage} isAdmin={isAdmin} setIsAdmin={setIsAdmin} /> */}
              <Header />

              <Routes>
                  {/* <Route path="/login" element={<LoginPage setUsernameOfLoggedIn={setUsernameOfLoggedIn} setEmailOfLoggedIn={setEmailOfLoggedIn} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} addFlashMessage={addFlashMessage} />} />
                  <Route exact path="/" element={<HomePage loggedIn={loggedIn} />} />               
                  <Route path="/user/edit_user" element={<UpdateUserProfilePage usernameOfLoggedIn={usernameOfLoggedIn} emailOfLoggedIn={emailOfLoggedIn} setEmailOfLoggedIn={setEmailOfLoggedIn} addFlashMessage={addFlashMessage} />} />
                  <Route path="/admin/all_users" element={<AdminUserManagementPage addFlashMessage={addFlashMessage} />} /> */}

                  <Route path="/login" element={<LoginPage />} />
                  <Route exact path="/" element={<HomePage />} />               
                  <Route path="/user/edit_user" element={<UpdateUserProfilePage />} />
                  <Route path="/admin/all_users" element={<AdminUserManagementPage />} />
              </Routes>
            </DispatchContext.Provider>
          </StateContext.Provider>
        </FlashMessageContext.Provider>
    </div>
  )
}

export default App
