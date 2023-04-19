import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'

import { AiOutlineCheckCircle } from 'react-icons/ai'
import { Button } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 250,
  bgcolor: '#fff',
  borderRadius: '10px',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const NewUserModal = ({ open, setUserModal }) => {
  const handleClose = () => setUserModal(false)

  const navigate = useNavigate()

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Usuário criado com sucesso!
          </Typography>
          <AiOutlineCheckCircle style={{ fontSize: '70px', color: 'green' }} />
          <Button onClick={() => navigate('/login')} variant="contained">
            Ir para Login
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default NewUserModal
