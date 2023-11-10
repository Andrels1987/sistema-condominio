import React from 'react'
import { useParams } from 'react-router'
import { useGetProprietarioPeloIdVeiculoQuery, useGetVeiculoPeloIdQuery } from '../../features/api/apiSlice'


const PerfilVeiculo = ({token}) => {
    const { id } = useParams()
  
    const { data: veiculo } = useGetVeiculoPeloIdQuery({token, id})
    const { data: proprietario } = useGetProprietarioPeloIdVeiculoQuery({token, id})
    
    console.log("Morador : ", proprietario, " : ", veiculo, " : ", id, " : ", token);
    
  return (
    <div className='veiculo-perfil'>
      {!veiculo ? <p>Loading...</p> : (        
      <article className='card'>  
        <section className='card-image'>
          <img src={veiculo.foto || "../../logo192.png"} alt="foto-veiculo" />
        </section>        
        <div className='card-info'>
          <h4>Marca: <code>{veiculo.marca}</code></h4>
          <h4>Modelo : <code>{veiculo.modelo}</code></h4>
          <h4>Cor : <code>{veiculo.cor}</code></h4>
          <h4>Placa : <code>{veiculo.placa}</code></h4>
          <h4>Proprietario</h4>
          {!proprietario ? (
            <p>Loading...</p>
          ) : (
            <div className='dependente-info'>       
                {proprietario.map(p =>(
                <p key={p.id}><code>{p.nome} {p.sobrenome} | {p.apartamento} {p.bloco} </code></p>
              ))}       
            </div>
            )}
        </div>  
      </article>
    
      )}
      </div>
  )
}

export default PerfilVeiculo