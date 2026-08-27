import { useState } from 'react'

import Header from './components/Header'
import MenuLateral from './components/MenuLateral'
import Conteudo from './components/Conteudo'

import Safra from './components/cadastros/Safra'
import Unidade from './components/cadastros/Unidade'
import Equipamento from './components/cadastros/Equipamento'
import Medicao from './components/cadastros/Medicao'
import UnidadeMedida from './components/cadastros/UnidadeMedida'
import TipoInformacao from './components/cadastros/TipoInformacao'
import Indicadores from './components/cadastros/Indicadores'

import './App.css'


function App() {

    const [menuAberto, setMenuAberto] = useState(true)

    const [tela, setTela] = useState('inicio')


    function alterarMenu() {
        setMenuAberto(!menuAberto)
    }


    return (
        <>
            <Header />

            <div className="layout">

                <MenuLateral
                    aberto={menuAberto}
                    setTela={setTela}
                />


                <main className="area-conteudo">

                    <div className="p-3 border-bottom bg-white">

                        <button
                            className="btn btn-primary"
                            onClick={alterarMenu}
                        >
                            Menu ☰
                        </button>

                    </div>


                    {/* INÍCIO */}
                    {tela === 'inicio' && <Conteudo />}


                    {/* CADASTROS */}
                    {tela === 'safra' && <Safra />}

                    {tela === 'unidade' && <Unidade />}

                    {tela === 'equipamento' && <Equipamento />}

                    {tela === 'medicao' && <Medicao />}

                    {tela === 'unidadeMedida' && <UnidadeMedida />}

                    {tela === 'tipoInformacao' && <TipoInformacao />}

                    {tela === 'indicadores' && <Indicadores />}

                </main>

            </div>
        </>
    )
}

export default App