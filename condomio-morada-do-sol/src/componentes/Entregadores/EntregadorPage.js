import React, { useState } from 'react'
import EntregadorList from './EntregadorList'
import FormEntregador from './FormEntregador'


const EntregadorPage = ({entregadores, token}) => {
  
  const [listaFiltrada, setListaFiltrada] = useState([]);
  return (
    <div className='entregador_page'>    
        <p>PESQUISAR</p>
        <FormEntregador setData={setListaFiltrada} entregadores={entregadores} data={listaFiltrada}/>
       <section className='entregadorList'>
            <EntregadorList listaFiltrada={listaFiltrada} token={token}/>
        </section> 
    </div>
  )
}

export default EntregadorPage