import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import { styled } from "styled-components";
import { useAddEntregaMutation, useGetEntregasQuery, useGetMoradoresQuery } from "../../features/api/apiSlice";
import { nanoid } from "@reduxjs/toolkit";
import { format} from 'date-fns' 


const RegistrarEntrada = ({token}) => {
  const { idEntregador:id } = useParams();
  const entregadores = useSelector((state) => state.entregador.entregadores);
  const { data: moradores } = useGetMoradoresQuery({token});
  const { data: entregasRegistradas, error } = useGetEntregasQuery({token});
  const [addEntrega]  = useAddEntregaMutation();  
  const [entregador, setEntregador] = useState({});
  const [morador, setMorador] = useState({nome: "", apartamento: "",bloco: ""});
  const [entregasPorEntregador, setEntregasPorEntregador] = useState([]);

  const [moradorFiltrado, setMoradorFiltrado] = useState([]);
  const [moradorEscolhido, setMoradorEscolhido] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    if(error){
      navigate("/")
    }
    if (!(entregadores.length === 0)) {
      let ent = entregadores.find((entregador) => entregador.id === id);
      setEntregador({ ...ent });
    }
    if (entregasRegistradas) {
      let registros = entregasRegistradas.filter((entrega) => entrega.idEntregador === id);
      let registroFormatado = []
      registros.map(r => {
        /* let ano = r.dataEntregaServico[0]
        let mes = r.dataEntregaServico[1]
        let dia = r.dataEntregaServico[2]
        console.log(r.dataEntregaServico);
        let hora = r.dataEntregaServico[3] - 3;
        let min = r.dataEntregaServico[4]
        let sec = r.dataEntregaServico[5] */
        let data = `${format(new Date(r.dataEntregaServico),"dd-MM-yyyy\tHH:mm:ss")}`;
        //let data = `${format(new Date(ano, mes-1, dia, hora, min, sec),"dd-MM-yyyy\tHH:mm:ss")}`;
        let rf = {
          id: r.id,
          nomeMorador: r.nomeMorador,
          apt: r.apartamento,
          bl: r.bloco,
          data: data
        }
       
        registroFormatado.push(rf)
        return null;
      })
      setEntregasPorEntregador([ ...registroFormatado ]);
    }
    if(morador.nome !== undefined || morador.apartamento !== undefined || morador.bloco !== undefined) {
      procurarMorador();
  }
  }, [entregadores, morador, moradorEscolhido, entregasRegistradas, setEntregasPorEntregador]);

  const procurarMorador = () => {   
    if (moradores) {
      let mf = moradores;   
      if(morador.nome !== undefined){     
            mf =  mf.filter(m => m.nome.includes(morador.nome))
      }

        if(morador.apartamento !== undefined ){
            const pattern = `^${morador.apartamento}`
            //mf =  mf.filter(m => m.apartamento.includes(`[^${morador.apartamento}]`))
            mf =  mf.filter(m => m.apartamento.match(pattern))
        }
        if(morador.bloco !== undefined ){
            mf =  mf.filter(m => m.bloco.toUpperCase().includes(morador.bloco.toUpperCase()))
        }
            
        
        /*
         if(m.nome.includes(morador.nome)){

        }
        if(m.nome.includes(morador.nome)){
            
        }
        if(m.nome.includes(morador.nome)){
            
        }
        if(m.nome.includes(morador.nome) || 
            m.apartamento.includes(morador.apartamento) ||
            (morador.bloco || m.bloco.toUpperCase() === morador.bloco.toUpperCase())){
                mf.push({...m});
                console.log(mf);
        }
        */
       //return null; 
      //})
      if(morador.nome === "" && morador.apartamento === "" && morador.bloco ===''){
        mf = [];
      }
      setMoradorFiltrado(mf); 
    }

    /* if (morador.nome === "") {
      setMoradorFiltrado([])
    } */
  };
  const finalizarRegistroDeEntrega = () =>{
    console.log("Object : ", moradorEscolhido);
    /* addEntrega({
      nomeEntregador: entregador.nome,
      empresaEntregador: entregador.empresa,
      numeroDocumentoEntregador: entregador.numeroDocumento,
      idEntregador: entregador.id,
      nomeMorador: moradorEscolhido.nome, 
      bloco: moradorEscolhido.bloco,
      apartamento: moradorEscolhido.apartamento,
    })  */
    //passar como um unico objeto
    //não aceita dois parametros
    console.log("TOKEN : ", token);
    addEntrega({moradorEscolhido, entregador, token})
    
  }

  return (
    <article className="registrar-entrada">
      <section className="perfil-entregador">        
        <Foto src={entregador.foto} alt="foto-entregador"/>
        <div>
         <Info> Nome: <Code>{entregador.nome}</Code></Info>
         <Info>Empresa: <Code>{entregador.empresa}</Code></Info>
         <Info>Documento: <Code>{entregador.numeroDocumento}</Code></Info>
        </div>
      </section>


       <section className="procurar-entregador">
          <p>Procurar morador</p>          
        <form
          action=""
        >
          <div>
            <label htmlFor="nome" >Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              onChange={(e) => setMorador({ ...morador, nome: e.target.value })}
              value={morador.nome || ""}
            />
          </div>
          <div>
            <label htmlFor="apartamento" >Apartamento</label>
            <input
              type="text"
              id="apartamento"
              name="apartamento"
              onChange={(e) =>
                setMorador({ ...morador, apartamento: e.target.value })
              }
              value={morador.apartamento || ""}
            />
          </div>
          <div>
            <label htmlFor="bloco" >Bloco</label>
            <input
              type="text"
              id="bloco"
              name="bloco"
              onChange={(e) =>
                setMorador({ ...morador, bloco: e.target.value })
              }
              value={morador.bloco || ""}
            />
          </div>
        </form>
      </section> 


       <section className="lista" >
          {moradorFiltrado.map((mf) => (
            <div key={nanoid()}>
              <h1 onClick={() => setMoradorEscolhido({...mf})}>{mf.nome}</h1>
            </div>
          ))}
      </section>

      <section className="morador"> 
        
            <h4>Entrega</h4>
            <h1>Nome morador: {moradorEscolhido.nome} {moradorEscolhido.sobrenome}</h1>
            <h1>Bloco: {moradorEscolhido.bloco}</h1>
            <h1>Apartamento: {moradorEscolhido.apartamento}</h1>
            <label htmlFor="obs">Observação</label>
            <textarea name="" id="obs" cols="30" rows="8" onChange={(e) => setMoradorEscolhido({...moradorEscolhido, observacao: e.target.value})} value={moradorEscolhido.observacao || ""}/>
            <input type="button" value="finalizar entrada" onClick={finalizarRegistroDeEntrega}/>
       
        </section> 

       <section className="registros">
        <Info>Lista de entregas deste entregador</Info>
          {/**TRANFORMAR EM COMPONENTE */}
          <div className="cabecalho">
            <p className="nome-morador">Morador</p>
            <p className="apt-morador">Apartamento</p>
            <p className="bl-morador">bloco</p>
            <p className="dat-registro">data</p>
          </div>
          {entregasPorEntregador.map(e => (
            <div key={e.id} className="tabela">
              <p className="nome-morador">{e.nomeMorador}</p>
              <p className="apt-morador">{e.apt}</p>
              <p className="bl-morador">{e.bl}</p>
              <p className="data-registro">{e.data}</p>
              
              
            </div>
          ))}
     </section>
    </article>
  );
};

export default RegistrarEntrada;

const Info = styled.h1`
    fontWeight: bolder;    
    padding: .3rem .5rem;

`;
const Code = styled.code`
    color: white;
    padding-left:1rem;
`;
const Foto = styled.img`
  width: 100px;
  height: 100px;
`;
