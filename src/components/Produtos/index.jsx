import React, { useEffect, useState } from 'react'
import ModalProdutosDetalhados from '../ModalProdutos'
import '../Produtos/style.css'

import api from '../services/api'
import Categoria from './Categorias'
import Header from './Header'

const Produtos = ({ theme, setTheme }) => {
  const [produtos, setProdutos] = useState([])
  const [produtoSelecionado, setProdutoSelecionado] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [categoriaAtual, setCategoriaAtual] = useState('Todos')

  const apiProdutos = async () => {
    const response = await api()
    setProdutos(response.data.products)
    setIsLoading(false)
  }

  const novaCategoria = {
    Celulares: 'smartphones',
    Cosméticos: 'skincare',
    Computadores: 'laptops',
    Alimentos: 'groceries',
    Artesanatos: 'home-decoration',
  }

  const produtosFiltrados =
    categoriaAtual == 'Todos'
      ? produtos
      : produtos.filter(
          (categoria) => categoria.category == novaCategoria[categoriaAtual]
        )

  useEffect(() => {
    apiProdutos()
  }, [])

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Categoria theme={theme} setCategoriaAtual={setCategoriaAtual} />
      {isLoading === true ? (
        <div
          className="loadingPage"
          style={{ backgroundColor: theme ? '#32383D' : '' }}
        >
          <div className="loading"></div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: theme ? '#32383D' : '' }}
          className="produtos"
        >
          {produtosFiltrados.map((produto) => (
            <div
              onClick={() => {
                setProdutoSelecionado(produto)
                setOpenModal(true)
              }}
              key={produto.id}
              className="card"
            >
              <div>
                <img src={produto.images[0]} />
              </div>
              <div className="detalhes">
                <h2>{produto.title}</h2>
                <p>{produto.description}</p>
                <p>{produto.rating}</p>
                <h4>R${produto.price},00</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalProdutosDetalhados
        openModal={openModal}
        setOpenModal={setOpenModal}
        produtoSelecionado={produtoSelecionado}
      />
    </>
  )
}
export default Produtos
