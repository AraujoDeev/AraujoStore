import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { backend, createSession } from '../components/services/backend'
import { Alert, Slide, Snackbar } from '@mui/material'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('user')
    if (usuarioRecuperado) {
      setUser(JSON.stringify(usuarioRecuperado))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await createSession(email, password)

    if (response.status === 404) {
      return setSnackBar({
        open: true,
        message: 'Email e/ou senha incorreta',
        severity: 'error',
      })
    }

    if (response.status === 500) {
      return setSnackBar({
        open: true,
        message: 'Ops! O nosso servidor tropeçou :(',
        severity: 'error',
      })
    }

    const usuarioLogado = response.data
    const token = response.data.token

    localStorage.setItem('user', JSON.stringify(usuarioLogado))
    localStorage.setItem('token', token)

    backend.defaults.headers.Authorization = `Bearer ${token}`

    setUser(usuarioLogado)
    navigate('/')
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    backend.defaults.headers.Authorization = null
    setUser(null)
    navigate('/login')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBar({ open: false })
  }

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />
  }
  return (
    <>
      <AuthContext.Provider
        value={{ authenticated: !!user, user, loading, login, logout }}
      >
        {children}
      </AuthContext.Provider>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          sx={{ width: '100%' }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
