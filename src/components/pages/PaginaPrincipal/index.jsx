import React, { useState } from 'react'
import Produtos from '../../Produtos'

const PaginaPrincipal = ({ theme, setTheme }) => {
  return (
    <>
      <Produtos theme={theme} setTheme={setTheme} />
    </>
  )
}

export default PaginaPrincipal
