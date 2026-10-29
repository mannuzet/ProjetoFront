
import { useState } from 'react'

function MenuLateral({
  aberto,
  setTela,
  indicadores = [],
  selecionarIndicador,
}) {
  const [cadastroAberto, setCadastroAberto] = useState(true)
  const [indicadoresAbertos, setIndicadoresAbertos] = useState(true)

  function alterarCadastro() {
    setCadastroAberto((anterior) => !anterior)
  }

  function alterarIndicadores() {
    setIndicadoresAbertos((anterior) => !anterior)
  }

  const itens = [
    { nome: 'Funcionários', tela: 'funcionarios' },
    { nome: 'Usuários', tela: 'usuarios' },
    { nome: 'Safras', tela: 'safra' },
    { nome: 'Unidades', tela: 'unidade' },
    { nome: 'Equipamentos', tela: 'equipamento' },
    { nome: 'Medições', tela: 'medicao' },
    { nome: 'Unidades de medida', tela: 'unidadeMedida' },
    { nome: 'Tipos de informação', tela: 'tipoInformacao' },
    { nome: 'Indicadores', tela: 'indicadores' },
  ]

  if (!aberto) {
    return null
  }

  const estiloBotao = {
    width: '100%',
    minHeight: '35px',
    padding: '7px 14px',
    border: '1px solid #59636d',
    borderRadius: '6px',
    background: 'transparent',
    color: '#f1f3f5',
    fontSize: '13px',
    textAlign: 'left',
    cursor: 'pointer',
    boxSizing: 'border-box',
  }

  return (
    <aside
      style={{
        width: '230px',
        minWidth: '230px',
        minHeight: 'calc(100vh - 60px)',
        background: '#454d55',
        color: '#ffffff',
        padding: '28px 20px',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          margin: '0 0 20px 5px',
          fontSize: '15px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#ffffff',
        }}
      >
        Menu
      </h2>

      {/* INÍCIO */}
      <button
        type="button"
        onClick={() => setTela('inicio')}
        style={{
          ...estiloBotao,
          background: '#68737d',
          border: 'none',
          marginBottom: '7px',
        }}
      >
        Início
      </button>

      {/* SUBMENU CADASTRO */}
      <button
        type="button"
        onClick={alterarCadastro}
        aria-expanded={cadastroAberto}
        style={{
          ...estiloBotao,
          background: '#68737d',
          border: 'none',
          marginBottom: '7px',
        }}
      >
        Cadastro {cadastroAberto ? '▼' : '▶'}
      </button>

      {cadastroAberto && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '18px',
          }}
        >
          {itens.map((item) => (
            <button
              key={item.tela}
              type="button"
              onClick={() => setTela(item.tela)}
              style={estiloBotao}
            >
              {item.nome}
            </button>
          ))}
        </div>
      )}

      {/* SUBMENU DINÂMICO DE INDICADORES */}
      <button
        type="button"
        onClick={alterarIndicadores}
        aria-expanded={indicadoresAbertos}
        style={{
          ...estiloBotao,
          background: '#292d32',
          border: 'none',
          marginBottom: '10px',
          fontWeight: '700',
        }}
      >
        Painéis de Indicadores {indicadoresAbertos ? '▼' : '▶'}
      </button>

      {indicadoresAbertos && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {indicadores.length === 0 ? (
            <p
              style={{
                fontSize: '12px',
                color: '#d0d5da',
                padding: '0 5px',
              }}
            >
              Nenhum indicador disponível.
            </p>
          ) : (
            indicadores.map((item, indice) => (
              <button
                key={item.Id ?? indice}
                type="button"
                title={item.Nome ?? 'Indicador'}
                onClick={() => selecionarIndicador?.(item)}
                style={estiloBotao}
              >
                {item.Nome ?? 'Indicador sem nome'}
              </button>
            ))
          )}
        </div>
      )}
    </aside>
  )
}

export default MenuLateral
