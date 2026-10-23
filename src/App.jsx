
import { useCallback, useEffect, useState } from 'react'

import MenuLateral from './components/MenuLateral'
import Conteudo from './components/Conteudo'

import Safra from './components/cadastros/Safra'
import Unidade from './components/cadastros/Unidade'
import Equipamento from './components/cadastros/Equipamento'
import Medicao from './components/cadastros/Medicao'
import UnidadeMedida from './components/cadastros/UnidadeMedida'
import TipoInformacao from './components/cadastros/TipoInformacao'
import Indicadores from './components/cadastros/Indicadores'
import Funcionarios from './components/cadastros/Funcionarios'
import Usuarios from './components/cadastros/Usuarios'

import VisualizarIndicador from './components/VisualizarIndicador'
import { indicadorService } from './services/indicadorService'

function App() {
  const [menuAberto, setMenuAberto] = useState(true)
  const [tela, setTela] = useState('inicio')

  const [indicadores, setIndicadores] = useState([])
  const [indicadorSelecionado, setIndicadorSelecionado] =
    useState(null)

  const [erroMenu, setErroMenu] = useState('')

  const alterarMenu = () => {
    setMenuAberto((anterior) => !anterior)
  }

  const atualizarMenu = useCallback(async () => {
    try {
      const dados = await indicadorService.listar()

      if (!Array.isArray(dados)) {
        throw new Error(
          'A API não retornou uma lista de indicadores.'
        )
      }

      setIndicadores(dados)
      setErroMenu('')
    } catch (e) {
      setIndicadores([])
      setErroMenu(
        e.message || 'Não foi possível carregar o menu de indicadores.'
      )
    }
  }, [])

  useEffect(() => {
    atualizarMenu()
  }, [atualizarMenu])

  function selecionarIndicador(item) {
    setIndicadorSelecionado(item)
    setTela('visualizarIndicador')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#343a40',
      }}
    >
      {/* BARRA SUPERIOR */}

      <header
        style={{
          height: '60px',
          background: '#292d32',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          onClick={alterarMenu}
          className="btn btn-outline-light btn-sm"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
        >
          ☰
        </button>

        <h1
          style={{
            margin: 0,
            fontSize: '23px',
            fontWeight: '700',
            letterSpacing: '0.3px',
          }}
        >
          Sistema React
        </h1>
      </header>

      {/* ÁREA PRINCIPAL */}

      <div
        style={{
          display: 'flex',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        {/* MENU LATERAL */}

        {menuAberto && (
          <MenuLateral
            aberto={menuAberto}
            setTela={setTela}
            indicadores={indicadores}
            selecionarIndicador={selecionarIndicador}
          />
        )}

        {/* CONTEÚDO */}

        <main
          style={{
            flex: 1,
            minWidth: 0,
            background: '#ffffff',
          }}
        >
          {erroMenu && (
            <div className="alert alert-warning m-3" role="alert">
              Não foi possível atualizar o submenu de indicadores:
              {' '}{erroMenu}
              <button
                type="button"
                className="btn btn-sm btn-outline-dark ms-2"
                onClick={atualizarMenu}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {tela === 'inicio' && <Conteudo />}

          {tela === 'safra' && <Safra />}

          {tela === 'unidade' && <Unidade />}

          {tela === 'equipamento' && <Equipamento />}

          {tela === 'medicao' && <Medicao />}

          {tela === 'unidadeMedida' && <UnidadeMedida />}

          {tela === 'tipoInformacao' && <TipoInformacao />}

          {tela === 'indicadores' && (
            <Indicadores atualizarMenu={atualizarMenu} />
          )}

          {tela === 'visualizarIndicador' && (
            <VisualizarIndicador
              indicador={indicadorSelecionado}
            />
          )}

          {tela === 'funcionarios' && <Funcionarios />}

          {tela === 'usuarios' && <Usuarios />}
        </main>
      </div>
    </div>
  )
}

export default App
