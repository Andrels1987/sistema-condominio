import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Loading from '../../Loading'
import { useGetMoradorPeloIdQuery } from '../../features/api/apiSlice'
import { useEffect } from 'react'

const PerfilMorador = ({token }) => {
  const { id } = useParams()
  const {data: morador, error} = useGetMoradorPeloIdQuery({token, id})
  const navigate = useNavigate()

  useEffect(() => {
    if(error){
      navigate("/")
    }
  }, [error])
  
 
  console.log("Morador : ",morador);
  return (
    <div className='perfil-morador'>
      {!morador ? <Loading /> : (
        <div className="perfilmorador">
        <div className="perfilmorador-card">

          <section className='card-image'>
            <img src={morador.foto || "../../logo192.png"} alt="foto-morador" />
          <h4>Nome: <code>{morador.nome} {morador.sobrenome}</code> </h4>
          <h4>Apartamento : <code>{morador.apartamento}</code></h4>
          <h4>Bloco : <code>{morador.bloco}</code></h4>
          <h4>Telefone : <code>{morador.telefone}</code></h4>
          </section>
          <div className="veiculos" style={{maxHeight: '100px'}}>
            <h4>Veiculos</h4>
            {!morador.veiculo || morador.veiculo.length === 0 ? (
              <div>sem veiculos</div>
            ) : (
              <div className='veiculo-info'>
                {morador.veiculo.map(v => (
                  <div key={v.placa} className='veiculo'>
                    <p><code>{v.marca} | {v.modelo} | {v.placa} | {v.cor}</code></p>
                    <Link className='link-veiculo' to={`../../veiculos/perfil-veiculo/${v.id}`}>informacões do veiculo</Link>
                  </div>
                ))}
              </div>)}
          </div>
          <div className='dependentes'>
            <h4>Depedentes</h4>
            {!morador.dependentes || morador.dependentes.length === 0 ? (
              <div>sem dependentes</div>
            ) : (
              <div className='dependentes-info'>
                {morador.dependentes.map(d => (
                  <div key={d.dependente.id} className='dependente'>
                    <p><code>{d.dependente.nome} {d.dependente.sobrenome} | {d.parentesco}</code></p>
                    <Link className='link-veiculo' to={`../perfil/${d.dependente.id}`}>informacões do morador</Link>
                  </div>
                ))}
              </div>)}
          </div>
        </div>
        </div>

      )}

    </div>
  )
}

export default PerfilMorador