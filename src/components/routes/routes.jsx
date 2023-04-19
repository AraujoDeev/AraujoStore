import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import '../../styles/styles.css'
import PaginaPrincipal from '../pages/PaginaPrincipal'
import Carrinho from '../pages/PaginaCarrinho'
import { useState, useContext } from 'react'
import PaginaLogin from '../pages/PaginaLogin'

import { AuthProvider, AuthContext } from '../../contexts/auth'
import PaginaCadastro from '../pages/PaginaCadastro'

const Rotas = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div>Loading...</div>
    }
    if (!authenticated) {
      return <Navigate to="/login" />
    }
    return children
  }

  const getTheme = () => {
    return JSON.parse(localStorage.getItem('theme')) || false
  }

  const [theme, setTheme] = useState(getTheme())
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="login" element={<PaginaLogin />} />
          <Route
            path="/"
            element={
              <Private>
                <PaginaPrincipal theme={theme} setTheme={setTheme} />
              </Private>
            }
          />
          <Route path="cadastro" element={<PaginaCadastro />} />
          <Route
            path="carrinho"
            element={
              <Private>
                <Carrinho theme={theme} />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Rotas
