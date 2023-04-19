import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './paginaCadastro.css'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import NewUserModal from './Modal'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { createUser } from '../../services/backend'

const PaginaCadastro = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [confimShowPassword, setConfirmShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userModal, setUserModal] = useState(false)

  const newUser = { email, password, confirmPassword }

  const newRegister = async () => {
    const response = await createUser(newUser)
    if (response.status === 201) {
      setUserModal(true)
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickConfirmShowPassword = () =>
    setConfirmShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(rgb(76, 168, 255), rgb(18, 1, 173))',
        }}
        display={'flex'}
        justifyContent="center"
        width={'100%'}
        height={'100vh'}
        component={'form'}
        onSubmit={handleSubmit}
      >
        <Box
          bgcolor={'#fff'}
          borderRadius={'8px'}
          width={'400px'}
          height={'500px'}
          border={'2px solid blue'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          padding={'20px'}
          marginTop={'40px'}
        >
          <Typography fontSize={'2em'} fontFamily={'sans-serif'}>
            Cadastre-se
          </Typography>
          <Box
            height={'300px'}
            width={'100%'}
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
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
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
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-basic">
                Confirme sua senha
              </InputLabel>
              <OutlinedInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="outlined-basic"
                id="confirm-outlined-adornment-password"
                type={confimShowPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickConfirmShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {confimShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button onClick={newRegister} type="submit" variant="contained">
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
      <NewUserModal open={userModal} setUserModal={setUserModal} />
    </>
  )
}

export default PaginaCadastro
