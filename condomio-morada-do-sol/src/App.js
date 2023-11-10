import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchEntregadores, getStatus } from "./store_repo/entregadorSlice";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./componentes/HomePage";

import MoradoresList from "./componentes/Moradores/MoradoresList";
import EntregadorPage from "./componentes/Entregadores/EntregadorPage";
import MoradorLayout from "./componentes/Moradores/MoradorLayout";
import FormMoradores from "./componentes/Moradores/FormMoradores";
import PerfilMorador from "./componentes/Moradores/PerfilMorador";
import Veiculos from "./componentes/Veiculos/Veiculos";
import PerfilVeiculo from "./componentes/Veiculos/PerfilVeiculo";
import { useGetLoginMutation, useGetMoradoresQuery, useGetTokenQuery, useGetVeiculosQuery, useLogoutAppMutation } from "./features/api/apiSlice";
import RegistrarEntrada from "./componentes/Entregas/RegistrarEntrada";
import Entregador from "./componentes/Entregadores/Entregador";
import Login from "./componentes/LoginRegistration/Login";
import { getUserInfo, keepUserInfo } from "./store_repo/user";

function App() {
  const [token, setToken] = useState("")
  const [isLogado, setIsLogado] = useState(null)
  const entregadores = useSelector(state => state.entregador.entregadores)
  const entregadoresStatus = useSelector(getStatus);
  const [getLogin] = useGetLoginMutation()
  const [logoutApp] = useLogoutAppMutation()
  const user = useSelector(getUserInfo)
  const {data : tokenObject} = useGetTokenQuery(token)
  const dispatch = useDispatch();

  const {
    data: moradores,
    isLoading: isLoadingMoradores,
    isSuccess: isSuccessMoradores,
    isError: isErrorMoradores,
    error: errorMoradores,
    refetch: refetchMoradores
} = useGetMoradoresQuery({ token })
  
const {
  data: veiculos,
  isLoading: isLoadingVeiculos,
  isSuccess: isSuccessVeiculos,
  isError: isErrorVeiculos,
  error: errorVeiculos,
  refetch : refetchVeiculos,
} = useGetVeiculosQuery({ token })

  useEffect(() => {
    if(isLogado === false){
      refetchMoradores();
      refetchVeiculos()
    }
    if (entregadoresStatus === "idle") {
      dispatch(fetchEntregadores(token));
    }
  }, [dispatch, entregadoresStatus, token, tokenObject]);


  
  const [login, setLogin] = useState({email: "", password: ""});
  
  const makeLogin = async(e) => {
    e.preventDefault();
    dispatch((keepUserInfo()))
    const {data : t }= await getLogin({login});
    if (t.token !== null && t.token !== "") { 
      console.log("Login : ", t);
      setToken(t.token)
      setIsLogado(true)
      return;
    }
    window.alert("Login não confere");
  }
  const makeLogout = async(e) => {
    const t = dispatch((logoutApp))
    
    if (t.token === undefined) { 
      setToken("")
      setIsLogado(false)
    }
  }


  return (
    <div className="App">
      <header className="app-header" >
        <Link style={{ color: "white" }} to={"/"}>
          <p>SunShine Residence</p>
        </Link>
        {user ? (<button onClick={makeLogout}>Logout</button>) : user.username}
      </header>
      <div className="main">
        <section className="menu-lateral">
          <ul>
            <li>
              <Link to={"/entregadores"}>Entregadores</Link>
            </li>
            <li>
              <Link to={"/moradores"}>Moradores</Link>
            </li>
            <li>
              <Link to={"/veiculos"}>Veiculos</Link>
            </li>
          </ul>
        </section>
        <section className="rotas">
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Login makeLogin={makeLogin} setLogin={setLogin} login={login}/>} />
              <Route path={"entregadores"} element={<EntregadorPage entregadores={entregadores} token={token}/>} />
              <Route path={"registrar-entrada/:idEntregador"} element={<RegistrarEntrada token={token}/>} />
              <Route path={"perfil-entregador/:idEntregador"} element={<Entregador token={token} entregadores={entregadores} />} />
              <Route path="moradores/" element={<MoradorLayout token={token}/>}>
                <Route index element={<MoradoresList moradores={moradores} isLoading={isLoadingMoradores} isSuccess={isSuccessMoradores} error={errorMoradores} isError={isErrorMoradores} setLogado={setIsLogado} isLogado={isLogado} token={token} />} />
                <Route path="add-morador/" element={<FormMoradores token={token}/>} />
                <Route path="perfil/:id" element={<PerfilMorador token={token}/>} />
              </Route>
              <Route path="veiculos">
                <Route index element={<Veiculos refetch={refetchVeiculos} isLogado={isLogado} veiculos={veiculos} isLoading={isLoadingVeiculos} isSuccess={isSuccessVeiculos} error={errorVeiculos} isError={isErrorVeiculos} token={token}  />} />
                <Route path="perfil-veiculo/:id" element={<PerfilVeiculo  token={token}/>} />
              </Route>
            </Route>
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
