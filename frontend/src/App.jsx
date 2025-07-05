import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import SettingPage from './Pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() //destructure from the useAuthStore hook , useAuthStore se 
  //state liya jaa rha

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser })
  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div >
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />}></Route>
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" />}></Route> {/*authuser nhi to signup..if hai to homepage */}
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>
        <Route path='/settings' element={<SettingPage />}></Route>
      </Routes>
      <Toaster></Toaster> 
    </div>
  )
}

export default App