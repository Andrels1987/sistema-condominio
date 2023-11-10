import React from 'react'
import { useParams } from 'react-router'
import { getEntregadorPeloId } from '../../store_repo/entregadorSlice';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';

const Entregador = () => {
  const {idEntregador} = useParams(); 
  const entregador = useSelector(state => getEntregadorPeloId(state,idEntregador))
  return (
    <div >
      {!entregador ? <Loading /> : (
        <div className="perfilEntregador">
        <div className="perfilEntregador-card">

          <section className='card-image'>
            <img src={entregador.foto || "../../logo192.png"} alt="foto-morador" />
          <h4>Nome: <code>{entregador.nome}</code> </h4>
          <h4>Empresa : <code>{entregador.empresa}</code></h4>
          <h4>Documento : <code>{entregador.numeroDocumento}</code></h4>
          </section>
        </div>
        </div>

      )}

    </div>
    
  )
}

export default Entregador