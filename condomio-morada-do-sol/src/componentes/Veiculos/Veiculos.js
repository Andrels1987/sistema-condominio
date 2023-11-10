import React, { useEffect, useState } from 'react'
import Loading from '../../Loading'
import { Link, useNavigate } from 'react-router-dom';

const Veiculos = ({ 
    veiculos,
    error,
    isSuccess,
    isLoading,
    isError,
    isLogado,
    refetch
}) => {

    

    const navigate = useNavigate()
    const [veiculo, setVeiculo] = useState({})
    const [contador, setContador] = useState(3)
    const [veiculoFiltrado, setVeiculoFiltrado] = useState([])

    useEffect(() => {
        console.log(isLogado);
        if (error || isLogado === false) {
            setVeiculoFiltrado([]);
            const timer = setInterval(() => {
                setContador(contador - 1)
                if(contador === 0) {
                    navigate("/")
                }
            }, 1000);
            return ()=> clearInterval(timer)
        }
        if (veiculos) {
            if (veiculo.placa === undefined || veiculo.placa === '') {
                setVeiculoFiltrado([...veiculos])
                return;
            }
            handleSearch();
        }
        //refetch();
    }, [error, veiculo, isLogado, contador, veiculos]);

    const handleSearch = () => {
        if (veiculo.placa !== '') {
            //moradoresFiltro = moradores.filter(mo => mo.nome.includes(morador.nome))
            setVeiculoFiltrado([...veiculos.filter(v => v.placa.includes(veiculo.placa))])
        }
    }

    let content;
    if (isLoading) {
        content = <Loading />
    } else if (isSuccess) {
        content =
            <div className='veiculos-page'>
                <section className='procurar-veiculo'>
                    <form action="">
                        <div>
                            <label htmlFor="placa">Placa</label>
                            <input type="text" name='placa' id='placa' onChange={(e) => setVeiculo({ ...veiculo, placa: e.target.value })} />
                        </div>
                    </form>
                </section>
                <div className='listaveiculos'>
                    {veiculoFiltrado.length > 0 ? (veiculoFiltrado.map(v => (
                        <div key={v.id} >
                            <Link to={`perfil-veiculo/${v.id}`}><h3 className=''>{v.marca} | {v.modelo} | {v.cor} | {v.placa} </h3></Link>
                        </div>
                    ))) : (
                        <div >
                           Usuario deslogou. Redirecionando em {contador}
                        </div>
                    )}
                </div>
            </div>
    } else if (isError) {
        content = <p>{error.status} Sem autorização</p>
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

export default Veiculos