import React from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

const CompraAdicionada = ({
  compraAdicionada,
  setCompraAdicionada,
  produtoSelecionado,
}) => {
  const navigate = useNavigate()
  return (
    <div
      className="modalCompraAdicionada"
      style={{ display: compraAdicionada === true ? 'block' : 'none' }}
    >
      <div
        onClick={() => setCompraAdicionada(false)}
        className="compraAdicionada"
      >
        <img className="iconeSucesso" src="Vector.svg" alt="teste" />
        <h1>Adicionado ao carrinho!</h1>
        <img src={produtoSelecionado.thumbnail} />
        <h1>{produtoSelecionado.title}</h1>
        <div className="btn-compra-adicionada">
          <button onClick={() => navigate('/carrinho')}>
            Ir para o carrinho
          </button>
          <button onClick={() => setCompraAdicionada(false)}>Voltar</button>
        </div>
      </div>
    </div>
  )
}

export default CompraAdicionada
