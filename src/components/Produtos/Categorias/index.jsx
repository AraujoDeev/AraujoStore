import React, { useEffect, useState } from 'react'
import '../Categorias/styles.css'

const Categoria = ({ setCategoriaAtual, theme }) => {
  return (
    <div
      style={{
        backgroundColor: theme ? '#32383D' : '',
        color: theme ? 'white' : '',
      }}
      className="categorias"
    >
      <ul
        onClick={(e) => setCategoriaAtual(e.target.innerText)}
        className="lista"
      >
        <li className="listaCategorias">Todos</li>
        <li className="listaCategorias">Celulares</li>
        <li className="listaCategorias">Cosméticos</li>
        <li className="listaCategorias">Computadores</li>
        <li className="listaCategorias">Alimentos</li>
        <li className="listaCategorias">Artesanatos</li>
      </ul>
    </div>
  )
}
export default Categoria
