import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    } 
  ]

  return (
    <header className='py-4 shadow-lg bg-black/80 backdrop-blur-md border-b border-gray-700'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/' className='flex items-center space-x-2'>
              <Logo width='120px' />
            </Link>
          </div>
          <ul className='hidden md:flex items-center space-x-6'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='px-4 py-2 text-white hover:text-blue-400 transition-colors duration-200 font-medium'
                >
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button className='text-white focus:outline-none'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header;