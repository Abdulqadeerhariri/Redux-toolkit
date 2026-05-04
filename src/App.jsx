import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() =>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData))
      }else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App