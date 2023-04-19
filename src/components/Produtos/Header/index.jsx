import React, { useEffect, useContext } from 'react'

import { BsFillCartFill } from 'react-icons/bs'

import './styles.css'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../../contexts/auth'

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

const Header = ({ theme, setTheme }) => {
  const navigate = useNavigate()

  const { authenticated, logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <>
      <header
        style={{
          background: theme === false ? '#4aa1fc' : ' #202529',
        }}
        id="header"
        className="header"
      >
        <div className="logo">
          <h1>Araujo Store</h1>
        </div>
        <div className="icone">
          <BsFillCartFill
            style={{ color: 'white' }}
            onClick={() => navigate('/carrinho')}
          />
        </div>
        <div className="dark">
          {theme === false ? (
            <BsFillMoonFill
              style={{ color: '#000072' }}
              onClick={() => setTheme(!theme)}
            />
          ) : (
            <BsFillSunFill
              style={{ color: 'yellow' }}
              onClick={() => setTheme(!theme)}
            />
          )}
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </header>
    </>
  )
}

export default Header
