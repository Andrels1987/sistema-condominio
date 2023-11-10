import React, { useState } from "react";
import Profile from "../Profile";
import { useAddMoradorMutation } from "../../features/api/apiSlice";


const moradorModelo = {
  "id": "",
  "nome": "",
  "sobrenome": "",
  "apartamento": "",
  "bloco": "",
  "telefone": "",
  "foto": "",
  "veiculo": [],
  "dependentes": [],
  "criadoEm": null
}

const dependenteModelo = {
  "parentesco": "",
  "dependente": {
    "nome": "",
    "sobrenome": "",
    "telefone": "",
    "foto": "",
  }
}
const veiculoModelo = {
  "modelo": "",
  "marca": "",
  "cor": "",
  "placa": "",
}
let dependentes = []
let veiculos = []
const FormMoradores = () => {
  const [morador, setMorador] = useState(moradorModelo);
  const [dependenteAtual, setDependenteAtual] = useState(dependenteModelo);

  const [fotoMorador, setFotoMorador] = useState("");
  const [fotoDependente, setFotoDependente] = useState("");
  const [fotoVeiculo, setFotoVeiculo] = useState("");

  const [veiculo, setVeiculo] = useState(veiculoModelo);
  const [addMorador] = useAddMoradorMutation()



  const handleSaveDependente = (e) => {
    e.preventDefault()
    dependentes.push({
      ...dependenteAtual, dependente: {
        ...dependenteAtual.dependente,
        apartamento: morador.apartamento,
        bloco: morador.bloco,
      }
    })
    setMorador({ ...morador, dependentes: dependentes })
    setDependenteAtual(dependenteModelo);
    console.log("dependente : ", dependenteAtual);
  }

  const handleSaveVeiculo = (e) => {
    e.preventDefault()
    veiculos.push({ ...veiculo, foto: fotoVeiculo })
    setMorador({ ...morador, veiculo: veiculos })
    console.log("Veiculo : ", veiculos);
    setVeiculo(veiculoModelo);
  }

  const handleSaveMorador = (e) => {
    e.preventDefault()
    setMorador({ ...morador, foto: fotoMorador })
  }
  const handleCriarMorador = (e) => {
    e.preventDefault()
    console.log("morador : ", morador);
    addMorador(morador)

  }
  const handleTab = (e) => {
    let showedEment = document.getElementsByClassName('notshow');
    console.log(showedEment)
    if (showedEment.length > 0) {
      for (const el of showedEment) {
        el.classList.remove("notshow");
      }
    }
    if (e.target.value === 'inserir dependente') {
      let element = document.getElementsByClassName('veiculo');
      element[0].classList.add('notshow')
    } else if (e.target.value === 'inserir veiculo') {
      let element = document.getElementsByClassName('dependente');
      element[0].classList.add('notshow')
    }
  }

  return (
    <div className="form-moradores" id="area-form-moradores">
      <form action="">
        <div className="card-campos" >
          <div className="campos nome">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={(e) => setMorador({ ...morador, nome: e.target.value })}
            />
          </div>

          <div className="campos sobrenome">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              id="sobrenome"
              onChange={(e) =>
                setMorador({ ...morador, sobrenome: e.target.value })
              }
            />
          </div>

          <div className="campos apartamento">
            <label htmlFor="apartamento">Apartamento</label>
            <input
              type="text"
              name="apartamento"
              id="apartamento"
              onChange={(e) =>
                setMorador({ ...morador, apartamento: e.target.value })
              }
            />
          </div>

          <div className="campos bloco">
            <label htmlFor="bloco">Bloco</label>
            <input
              type="text"
              name="bloco"
              id="bloco"
              onChange={(e) =>
                setMorador({ ...morador, bloco: e.target.value })
              }
            />
          </div>

          <div className="campos telefone">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              name="telefone"
              id="telefone"
              onChange={(e) =>
                setMorador({ ...morador, telefone: e.target.value })
              }
            />
          </div>

        </div>
        <section hidden={false} className="foto_morador">
          <h4 id="" >Foto</h4>
          <section className="">
            <Profile setData={setFotoMorador} data={fotoMorador} />
            <button type="submit" disabled={false} onClick={handleSaveMorador}>
              Usar foto e salvar
            </button>
          </section>

        </section>

        <div className="botoes">
          <div>
            <label htmlFor="">Possui dependentes</label>
            <button type="button" value="inserir dependente" onClick={handleTab}>Sim</button>
          </div>
          <div>
            <label htmlFor="">Possui veiculo</label>
            <button type="button" value="inserir veiculo" onClick={handleTab}>Sim</button>
          </div>
        </div>

        <section className="area-adicional">
          <div className="dependente ">
            <div>
              <div className="campos parentesco">
                <label htmlFor="parentesco">Parentesco</label>
                <input
                  type="text"
                  name="parentesco"
                  id="parentesco"
                  onChange={(e) => setDependenteAtual({ ...dependenteAtual, parentesco: e.target.value })}
                  value={dependenteAtual.parentesco || ""}
                />
              </div>
              <div className="campos nome">
                <label htmlFor="nomedependente">Nome dependente</label>
                <input
                  type="text"
                  name="nomedependente"
                  id="nomedependente"
                  onChange={(e) =>
                    setDependenteAtual(
                      {
                        ...dependenteAtual,
                        dependente: {
                          ...dependenteAtual.dependente,
                          nome: e.target.value
                        }
                      })}
                      value={dependenteAtual.dependente.nome || ""}
                />
              </div>

              <div className="campos sobrenome">
                <label htmlFor="sobrenomedependente">Sobrenome</label>
                <input
                value={dependenteAtual.dependente.sobrenome || ""}
                  type="text"
                  name="sobrenomedependente"
                  id="sobrenomedependente"
                  onChange={(e) =>
                    setDependenteAtual({ ...dependenteAtual, dependente: 
                    { ...dependenteAtual.dependente, sobrenome: e.target.value } })
                  }
                />
              </div>

              <div className="campos telefone">
                <label htmlFor="telefonedependente">Telefone</label>
                <input
                value={dependenteAtual.dependente.telefone || ""}
                  type="text"
                  name="telefonedependente"
                  id="telefonedependente"
                  onChange={(e) =>
                    setDependenteAtual({ ...dependenteAtual, dependente: { ...dependenteAtual.dependente, telefone: e.target.value } })
                  }
                />
              </div>
              <button type="submit" disabled={false} onClick={(e) => handleSaveDependente(e)}>
                Adicionar Dependente
              </button>
            </div>
            <section style={{ position: "relative" }} hidden={false} className="foto_dependente">
              <h4 id="">Foto</h4>
              <section className="">
                <Profile setData={setFotoDependente} data={fotoDependente} />
              </section>
            </section>
            <input onClick={(e) => setDependenteAtual({
              ...dependenteAtual,
              dependente: {
                ...dependenteAtual.dependente,
                foto: fotoDependente
              }
            })}
              disabled={fotoDependente === "" ? true : false}
              className="usrFotoBtn" type="button" value={'usar essa foto'} />
          </div>

          <div className="veiculo notshow">
            <div >
              <div className="campos">
                <label htmlFor="modelo">Modelo</label>
                <input
                value={veiculo.modelo || ""}
                  type="text"
                  name="modelo"
                  id="modelo"
                  onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
                />
              </div>

              <div className="campos">
                <label htmlFor="cor">Cor</label>
                <input
                value={veiculo.cor || ""}
                  type="text"
                  name="cor"
                  id="cor"
                  onChange={(e) => setVeiculo({ ...veiculo, cor: e.target.value })}
                />
              </div>

              <div className="campos">
                <label htmlFor="placa">Placa</label>
                <input
                value={veiculo.placa || ""}
                  type="text"
                  name="placa"
                  id="placa"
                  onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value })}
                />
              </div>

              <div className="campos">
                <label htmlFor="marca">Marca</label>
                <input
                value={veiculo.marca || ""}
                  type="text"
                  name="marca"
                  id="marca"
                  onChange={(e) => setVeiculo({ ...veiculo, marca: e.target.value })}
                />
              </div>
              <button type="submit" disabled={false} onClick={handleSaveVeiculo}>
                Adicionar veiculo
              </button>
            </div>
            <section className="foto_veiculo">
              <h4 id="section-foto">Foto veiculo</h4>
              <section className="veiculo_profile">
                <Profile setData={setFotoVeiculo} data={fotoVeiculo} />
              </section>
            </section>
          </div>
        </section>
        <button name="criar" type="button" onClick={(e) => handleCriarMorador(e)}>Criar Morador</button>
      </form>
    </div>
  );
};

export default FormMoradores;
