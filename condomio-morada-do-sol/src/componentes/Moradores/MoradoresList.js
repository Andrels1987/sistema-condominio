import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Loading'
import { useGetMoradoresQuery, useGetTokenQuery } from '../../features/api/apiSlice'
const MoradoresList = ({ isLoading, isSuccess, error, isError, isLogado, moradores }) => {

    const [morador, setMorador] = useState({})
    const [contador, setContador] = useState(5)
    const [moradoresFiltrados, setMoradoresFiltrados] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        if (moradores) {
            if (isLogado === false) {
                setMoradoresFiltrados([])
                const timer = setInterval(() => {
                    setContador(contador - 1)
                    if (contador === 1) {
                        navigate("/");
                    }
                }, 1000);
                return () => clearInterval(timer)
            } else {
                setMoradoresFiltrados([...moradores])
            }

        }
        if (moradoresFiltrados.length > 0) {
            handleSearch()
        }

        if (error) {
            console.log("ERROR1 : ", error);
            setMoradoresFiltrados([])
            const timer = setInterval(() => {
                setContador(contador - 1)
                if (contador === 1) {
                    navigate("/");
                }
            }, 1000);
            return () => clearInterval(timer)
            return
        }
    }, [moradores, error, morador, isLogado, contador]);



    const mostratInfoMorador = (e) => {
        e.preventDefault();
        let parent = e.target.parentNode
        let listamoradores = parent.parentNode;
        let elements = listamoradores.getElementsByClassName("info")
        let showElement = parent.getElementsByTagName("div");
        for (let el of elements) {
            if (showElement[0] === el) {
                el.classList.toggle("show-info");
            } else {
                el.classList.remove("show-info");
            }
        }
    };

    const handleSearch = () => {
        if (morador.nome !== '') {
            //moradoresFiltro = moradores.filter(mo => mo.nome.includes(morador.nome))
            setMoradoresFiltrados([...moradores.filter(mo => mo.nome.includes(morador.nome))])
        }
    }


    let content;
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {

        content =
            <div className='moradores-page'>
                <section className='procurar-morador'>
                    <form action="">
                        <div>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name='nome' id='nome' onChange={(e) => setMorador({ ...morador, nome: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="apartamento">Apartamento</label>
                            <input type="text" name='apartamento' id='apartamento' onChange={(e) => setMorador({ ...morador, apartamento: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="bloco">Bloco</label>
                            <input type="text" name='bloco' id='bloco' onChange={(e) => setMorador({ ...morador, bloco: e.target.value })} />
                        </div>
                    </form>
                </section>
                <div className='listamoradores'>
                    {moradoresFiltrados.length === 0 ?
                        (<p> Usuario deslogado : Voce sera redirecionado em {contador}</p>)
                        :
                        (moradoresFiltrados.map(morador => (
                            <div key={morador.id} >
                                <h1 className='morador' onClick={(e) => mostratInfoMorador(e)}>{morador.nome} {morador.sobrenome}</h1>
                                <div className={`info`}>
                                    <h3 className="bloco">Bloco: <code>{morador.bloco}</code></h3>
                                    <h3 className="apartamento">Apartamento: <code >{morador.apartamento}</code></h3>
                                    <Link className='informacoes' to={`perfil/${morador.id}`}>Informações do morador</Link>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
    } else if (isError) {
        content = <p> Usuario deslogado. Voce será redicreconado em {contador}</p>
    }

    return (
        <div>
            {content}
            <div className='add-morador'>
                <Link to={"add-morador"}>add</Link>
            </div>
        </div>
    )
}

export default MoradoresList