import './paginaLogin.css'

import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'

import Box from '@mui/material/Box'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGoogle } from 'react-icons/ai'

const PaginaLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const style = {
    backgroundColor: '#eeeef0',
    color: 'black',
    width: '70%',
    pointerEvents: 'auto',
  }

  const { authenticated, login } = useContext(AuthContext)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    setEmail('')
    setPassword('')
  }

  const navigate = useNavigate()

  return (
    <Box className="login">
      <Box className="animacao">
        <Box component={'form'} onSubmit={handleSubmit} className="form">
          <h1>Login</h1>
          <Box display={'flex'} flexDirection={'column'} height={'100%'}>
            <Box
              height={'50%'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-around'}
            >
              <FormControl fullWidth variant="outlined">
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  required
                />
              </FormControl>
              <FormControl required variant="outlined">
                <InputLabel htmlFor="outlined-basic">Senha</InputLabel>
                <OutlinedInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="outlined-basic"
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button variant="contained" type="submit">
                Entrar
              </Button>
            </Box>
            <Box>
              <Box display={'flex'} justifyContent={'end'}>
                <Link>Esqueceu sua senha?</Link>
              </Box>
              <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                justifyContent={'space-around'}
                height={'100px'}
              >
                <Typography>Ou entre usando</Typography>
                <Box
                  width={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                  gap={'10px'}
                  alignItems={'center'}
                >
                  <Tooltip title="Opção desabilitada por ora">
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      width={'100%'}
                    >
                      <Button sx={style} disabled variant="contained">
                        <Link
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textDecoration: 'none',
                            width: '100%',
                            padding: '0 25px',
                          }}
                        >
                          <AiOutlineGoogle className="gg-icon" />
                          <Typography
                            letterSpacing={-1}
                            fontFamily={'Montserrat, sans-serif'}
                            fontSize={14}
                            fontWeight={700}
                            color={'black'}
                          >
                            Google
                          </Typography>
                        </Link>
                      </Button>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
              <Box
                marginTop={'40px'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Typography>Não tem cadastro?</Typography>
                <Box onClick={() => navigate('/cadastro')}>
                  <Link>Cadastre-se</Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PaginaLogin
