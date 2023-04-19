import React, { useState } from 'react'
import '../ModalProdutos/style.css'

import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai'
import CompraAdicionada from '../CompraAdicionada'

const ModalProdutosDetalhados = ({
  openModal,
  setOpenModal,
  produtoSelecionado,
}) => {
  const [input, setInput] = useState(1)
  const [carrinhoDeCompras, setCarrinhoDeCompras] = useState(
    JSON.parse(localStorage.getItem('carrinho')) || []
  )
  const [compraAdicionada, setCompraAdicionada] = useState(false)
  const somarInput = () => {
    setInput(input + 1)
  }

  const subtrairInput = () => {
    if (input == 1) {
      setInput(1)
    } else {
      setInput(input - 1)
    }
  }

  const comprasCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    let novoCarrinho = carrinho

    if (!carrinho.length) {
      novoCarrinho = [produtoSelecionado]
    } else if (carrinhoDeCompras.includes(produtoSelecionado)) {
      return
    } else {
      novoCarrinho.push(produtoSelecionado)
    }
    setCarrinhoDeCompras(novoCarrinho)
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
    setCompraAdicionada(true)
    setOpenModal(false)
  }
  return (
    <>
      <div
        className="modal"
        style={{ display: openModal === true ? 'block' : 'none' }}
      >
        <div className="container">
          <button
            onClick={() => {
              setOpenModal(false)
              setInput(1)
            }}
            className="fecharModal"
          >
            X
          </button>
          <div className="top">
            <div className="descricao">
              <h1>{produtoSelecionado.title}</h1>
              <h4>{produtoSelecionado.rating}</h4>
              <p>{produtoSelecionado.description}</p>
            </div>
            <div className="imagem">
              <img
                className="img"
                src={produtoSelecionado.thumbnail}
                alt="Teste"
              />
            </div>
          </div>
          <div className="bottom">
            <div className="valor">
              <strong>R${produtoSelecionado.price},00</strong>
            </div>
            <div className="quantidade">
              <button onClick={() => subtrairInput()}>
                <AiOutlineLine />
              </button>
              <input type="number" min={0} step={1} value={input} readOnly />
              <button onClick={() => somarInput()}>
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className="button">
            <button onClick={() => comprasCarrinho()}>
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
      <CompraAdicionada
        setCompraAdicionada={setCompraAdicionada}
        compraAdicionada={compraAdicionada}
        produtoSelecionado={produtoSelecionado}
      />
    </>
  )
}
export default ModalProdutosDetalhados
