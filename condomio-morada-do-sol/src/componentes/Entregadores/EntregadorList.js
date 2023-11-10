import React from "react";
import { useDispatch } from "react-redux";
import { deleteEntregadores } from "../../store_repo/entregadorSlice";
import { Link } from "react-router-dom";
import { useGetTokenQuery } from "../../features/api/apiSlice";

const EntregadorList = ({ listaFiltrada }) => {
  const dispatch = useDispatch();
  const mostratInfoEntregador = (e) => {
    e.preventDefault();
    let parent = e.target.parentNode
    let showedEment = parent.getElementsByClassName("show-info");
    if(e.target.classList[0] === 'entregador'){
      if(showedEment.length > 0){
        for(const el of showedEment){
          if(e.target !== el){
            el.classList.remove("show-info");
          }
        }
      }
        e.target.style.transition = '2s'        
        e.target.classList.toggle("show-info");
    }    
  };
  const {data: token} = useGetTokenQuery()

  const handleDelete = (id) =>{
    if(token.token !== ""){
      const t = token.token
      console.log(t)
      dispatch(deleteEntregadores({id, t}))
    }
  }

  return (
    <div className="entregadores">
      <div className="title">
        <p>ENTREGADORES</p>
      </div>

      {listaFiltrada.length === 0 ? (
        <h1 >Nenhum entregador encontrado</h1>
      ) : (
        listaFiltrada.map((entregador) => (
          <div onClick={(e) => mostratInfoEntregador(e)} className="entregador" key={entregador.id}>
              {entregador.nome}        
            <div className={`info`}>
              <div className="personal">
                <img
                  src={entregador.foto ? entregador.foto : "./logo192.png"}
                  alt="foto"
                  width={100}
                  height={100}
                />
                <div>

              <p>Empresa: <code>{entregador.empresa}</code></p>
              <p>Numero Documento: <code>{entregador.numeroDocumento}</code></p>
                </div>
              </div>
              <section>
                <button
                  onClick={() => handleDelete(entregador.id)}
                >
                  deletar
                </button>
                <Link to={`/perfil-entregador/${entregador.id}`}>
                  Dados do entregador
                </Link>
                <Link to={`/registrar-entrada/${entregador.id}`}>
                  Registrar entrada
                </Link>
              </section>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EntregadorList;
