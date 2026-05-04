import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }


  return (
    <button 
      className='px-4 py-2 text-white hover:text-red-400 transition-colors duration-200 font-medium'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn