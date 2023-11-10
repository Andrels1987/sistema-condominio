import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postEntregadores } from "../../store_repo/entregadorSlice";
import Profile from "../Profile";

const FormEntregador = ({ setData, entregadores, data }) => {
  const [estaEscondido, setEstaEscondido] = useState(true);
  const [foto, setFoto] = useState("");
  const [salvarEntregador, setSalvarEntregador] = useState(false);

  const [newEntregador, setNewEntregador] = useState({nome: '', empresa: '', numeroDocumento: '', foto: foto});
  
  const dispatch = useDispatch();
  
  useEffect(() => {  
    handleSearch();    
  }, [newEntregador, entregadores]);

  const handleSave = (e) => {
    e.preventDefault();
    console.log(newEntregador);
    dispatch(postEntregadores(newEntregador));
    setNewEntregador({ nome: "", empresa: "", numeroDocumento: "", foto: "" });
    setData([]);
    setEstaEscondido(!estaEscondido)
  }; 
  const handleSearch = () => {    
    
    let lista = entregadores.filter((entregador) => {
      let isValid = true;
      /* return (
        (entregador.nome.includes(newEntregador.nome) && newEntregador.nome !== "") ||
        ((entregador.nome.includes(newEntregador.nome)) && (entregador.empresa.includes(newEntregador.empresa)))||
        (entregador.empresa.includes(newEntregador.empresa) && newEntregador.empresa !== "") ||
        (entregador.numeroDocumento.includes(newEntregador.numeroDocumento) && newEntregador.numeroDocumento !== "")
      ); */
      if (newEntregador.nome !== "") {
        if (entregador.nome.includes(newEntregador.nome)) {
          isValid = false
        } else {
          isValid = true;
        }
      }
      if (newEntregador.empresa !== "") {
        if ((entregador.nome.includes(newEntregador.nome) && entregador.empresa.includes(newEntregador.empresa))) {
          isValid = false;
        } else {
          isValid = true;
        }
      }
      if (newEntregador.numeroDocumento !== "") {
        if (!(entregador.numeroDocumento.includes(newEntregador.numeroDocumento))) {
          
          isValid = false;
        }
      } 
      
      if (!isValid) {
        return entregador
      }
      return null;
    });
         
    if (lista.length > 0) {
      setData(lista);
      return;
    } else if (
      ((newEntregador.nome === undefined || newEntregador.nome === "") &&
        (newEntregador.empresa === undefined || newEntregador.empresa === "") &&
        (newEntregador.numeroDocumento === undefined || newEntregador.numeroDocumento === "")) && lista.length === 0
    ) {
      setEstaEscondido(true);
      setData(entregadores);
      return;
    } else if (
      (newEntregador.nome !== "" ||
        newEntregador.empresa !== "" ||
        newEntregador.numeroDocumento !== "") &&
      lista.length === 0
    ) {
      setData([]);
      return;
    }

  };

  const abrirAreaDeFoto = (e) => {
    e.preventDefault()
    setEstaEscondido(!estaEscondido)
    setSalvarEntregador(!salvarEntregador)
  }
  const salvarFoto = (e) => {
    e.preventDefault();
    setNewEntregador({...newEntregador, foto})
  }
  const canSave =
    newEntregador.nome &&
    newEntregador.empresa &&
    newEntregador.numeroDocumento;
  //HANDLE SUBMIT
  return (
    <section className='entregadorForm '>
      <form action="">
        <div>
          <label htmlFor="nome">NOME</label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={(e) =>
              setNewEntregador({ ...newEntregador, nome: e.target.value })
            }
            value={newEntregador.nome || ""}
          />
        </div>

        <div>
          <label htmlFor="empresa">EMPRESA</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            onChange={(e) =>
              setNewEntregador({ ...newEntregador, empresa: e.target.value })
            }
            value={newEntregador.empresa || ""}
          />
        </div>

        <div>
          <label htmlFor="documento">RG/CPF</label>
          <input
            type="text"
            id="documento"
            name="documento"
            onChange={(e) =>
              setNewEntregador({
                ...newEntregador,
                numeroDocumento: e.target.value,
              })
            }
            value={newEntregador.numeroDocumento || ""}
          />
        </div>
        {salvarEntregador ? (<button 
            onClick={(e) => handleSave(e)}>
           Salvar Entregador
           </button>): (<button 
            onClick={(e) => abrirAreaDeFoto(e)}
           disabled={data.length === 0 ? false : true}>
           Adicionar Entregador
           </button>)}
      </form>
      <div className="profile" hidden={estaEscondido}>
        <h4 id="section-foto">FOTO</h4>
        <section className="foto_entregador">
          <Profile setData={setFoto} data={foto} />
          <button type="submit" disabled={!canSave} onClick={salvarFoto}>
            SALVAR
          </button>
        </section>
      </div>
    </section>
  );
};

export default FormEntregador;