import { Alert, Slide, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../PaginaCarrinho/style.css'
import { BsFillCartXFill } from 'react-icons/bs'

const Carrinho = ({ theme, setTheme }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [produtos, setProdutos] = useState(
    JSON.parse(localStorage.getItem('carrinho')) || []
  )

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />
  }

  const navigate = useNavigate()

  const remove = (productId) => {
    let temp = produtos.filter((carrinho) => carrinho.id != productId)
    setProdutos(temp)
    localStorage.setItem('carrinho', JSON.stringify(temp))
  }

  const finalizarCompra = (produto) => {
    setOpenSnackBar(true)
    remove(produto)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  return (
    <div
      style={{
        backgroundColor: theme ? '#00305f' : '',
        color: theme ? 'white' : '',
      }}
      className="containerCarrinho"
    >
      <h1 className="car">Carrinho</h1>

      {produtos.length === 0 ? (
        <div className="vazio">
          <BsFillCartXFill className="carVazio" />
          <h1>O seu carrinho esta vazio.</h1>
        </div>
      ) : (
        <ul className="listaCarrinho">
          {produtos.map((produto) => (
            <li className="produtosCarrinho" key={produto.id}>
              <img
                className="imgCarrinho"
                src={produto.thumbnail}
                alt="teste"
              />
              <div className="desc">
                <h1>{produto.title}</h1>
                <h3>R${produto.price},00</h3>
              </div>
              <div className="btn">
                <button
                  onClick={() => {
                    finalizarCompra(produto.id)
                    setOpenSnackBar(true)
                  }}
                >
                  Finalizar compra
                </button>
                <button onClick={() => remove(produto.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')} className="btn-tela-inicial">
        Tela inicial
      </button>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={TransitionLeft}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Compra finalizada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Carrinho
