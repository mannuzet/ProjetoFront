
import { useCallback, useEffect, useState } from 'react'
import { api } from '../services/api'
import { CADASTROS } from '../config/cadastros'

const nomeItem = (item) =>
  item?.NomeSafra ?? item?.Nome ?? `#${item?.Id ?? ''}`

const valorInput = (valor, tipo) => {
  if (valor == null) return ''
  if (tipo === 'datetime-local') return String(valor).slice(0, 16)
  if (tipo === 'date') return String(valor).slice(0, 10)
  return String(valor)
}

export default function CadastroApi({ recurso }) {
  const cfg = CADASTROS[recurso]

  const [lista, setLista] = useState([])
  const [opcoes, setOpcoes] = useState({})
  const [form, setForm] = useState({})
  const [idEdicao, setIdEdicao] = useState(null)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [salvando, setSalvando] = useState(false)

  const carregar = useCallback(async () => {
    if (!cfg) return

    setCarregando(true)

    try {
      const dados = await api(recurso)

      if (!Array.isArray(dados)) {
        throw new Error(
          'A API deve retornar uma lista JSON.'
        )
      }

      setLista(dados)

      const origens = [
        ...new Set(
          cfg.campos
            .filter((campo) => campo.origem)
            .map((campo) => campo.origem)
        ),
      ]

      const pares = await Promise.all(
        origens.map(async (origem) => {
          const resultado = await api(origem)

          if (!Array.isArray(resultado)) {
            throw new Error(
              `A API de ${origem} não retornou uma lista.`
            )
          }

          return [origem, resultado]
        })
      )

      setOpcoes(Object.fromEntries(pares))
      setErro('')
    } catch (e) {
      setErro(e.message || 'Erro ao carregar os dados.')
    } finally {
      setCarregando(false)
    }
  }, [cfg, recurso])

  useEffect(() => {
    setForm({})
    setIdEdicao(null)
    setLista([])
    setOpcoes({})
    setMensagem('')
    carregar()
  }, [carregar])

  function editar(item) {
    setIdEdicao(item.Id)

    setForm(
      Object.fromEntries(
        cfg.campos.map((campo) => [
          campo.nome,
          valorInput(item[campo.nome], campo.tipo),
        ])
      )
    )

    setErro('')
    setMensagem('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelar() {
    setIdEdicao(null)
    setForm({})
    setErro('')
    setMensagem('')
  }

  async function salvar(event) {
    event.preventDefault()
    setErro('')
    setMensagem('')

    try {
      const dados = {}

      for (const campo of cfg.campos) {
        const valor = form[campo.nome] ?? ''

        if (valor === '') {
          throw new Error(
            `Preencha o campo ${campo.rotulo}.`
          )
        }

        if (
          campo.tipo === 'select' ||
          campo.tipo === 'number'
        ) {
          const numero = Number(valor)

          if (!Number.isFinite(numero)) {
            throw new Error(
              `Valor inválido em ${campo.rotulo}.`
            )
          }

          if (
            campo.tipo === 'select' &&
            (!Number.isInteger(numero) || numero <= 0)
          ) {
            throw new Error(
              `Selecione uma opção válida para ${campo.rotulo}.`
            )
          }

          dados[campo.nome] = numero
        } else if (campo.tipo === 'datetime-local') {
          dados[campo.nome] = `${valor}:00`
        } else {
          dados[campo.nome] = valor
        }
      }

      if (
        recurso === 'safras' &&
        dados.DataFim < dados.DataInicio
      ) {
        throw new Error(
          'A data final não pode ser anterior à data inicial.'
        )
      }

      if (
        recurso === 'medicoes' &&
        dados.Valor < 0
      ) {
        throw new Error(
          'O valor da medição não pode ser negativo.'
        )
      }

      setSalvando(true)

      const editando = idEdicao !== null

      if (!editando) {
        await api(recurso, 'POST', dados)
      } else {
        await api(
          recurso,
          'PUT',
          { Id: idEdicao, ...dados },
          idEdicao
        )
      }

      setForm({})
      setIdEdicao(null)

      await carregar()

      setMensagem(
        editando
          ? 'Registro atualizado com sucesso.'
          : 'Cadastro realizado com sucesso.'
      )
    } catch (e) {
      setErro(e.message || 'Erro ao salvar o registro.')
    } finally {
      setSalvando(false)
    }
  }

  async function excluir(id) {
    if (!window.confirm('Confirma a exclusão deste registro?')) {
      return
    }

    setErro('')
    setMensagem('')

    try {
      await api(recurso, 'DELETE', null, id)
      await carregar()
      setMensagem('Registro excluído com sucesso.')
    } catch (e) {
      setErro(
        e.message ||
        'Erro ao excluir. Verifique os relacionamentos.'
      )
    }
  }

  if (!cfg) {
    return (
      <section className="p-4">
        <div className="alert alert-danger">
          Cadastro desconhecido.
        </div>
      </section>
    )
  }

  return (
    <section className="p-4">
      <h2 className="mb-4">Cadastro de {cfg.titulo}</h2>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {mensagem && (
        <div className="alert alert-success" role="status">
          {mensagem}
        </div>
      )}

      <form
        className="card card-body shadow-sm mb-4"
        onSubmit={salvar}
      >
        {cfg.campos.map((campo) => (
          <div className="mb-3" key={campo.nome}>
            <label
              className="form-label"
              htmlFor={`${recurso}-${campo.nome}`}
            >
              {campo.rotulo}
            </label>

            {campo.tipo === 'select' ? (
              <select
                id={`${recurso}-${campo.nome}`}
                className="form-select"
                required={campo.obrigatorio}
                value={form[campo.nome] ?? ''}
                onChange={(e) =>
                  setForm((atual) => ({
                    ...atual,
                    [campo.nome]: e.target.value,
                  }))
                }
              >
                <option value="">Selecione...</option>

                {(opcoes[campo.origem] ?? []).map((item) => (
                  <option key={item.Id} value={item.Id}>
                    {nomeItem(item)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${recurso}-${campo.nome}`}
                className="form-control"
                type={campo.tipo}
                required={campo.obrigatorio}
                step={
                  campo.tipo === 'number'
                    ? 'any'
                    : undefined
                }
                min={
                  campo.tipo === 'number'
                    ? '0'
                    : undefined
                }
                value={form[campo.nome] ?? ''}
                onChange={(e) =>
                  setForm((atual) => ({
                    ...atual,
                    [campo.nome]: e.target.value,
                  }))
                }
              />
            )}
          </div>
        ))}

        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={salvando}
          >
            {salvando
              ? 'Salvando...'
              : idEdicao === null
                ? 'Cadastrar'
                : 'Salvar alterações'}
          </button>

          {idEdicao !== null && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={cancelar}
            >
              Cancelar
            </button>
          )}

          <button
            className="btn btn-outline-secondary ms-auto"
            type="button"
            onClick={carregar}
            disabled={carregando}
          >
            Atualizar lista
          </button>
        </div>
      </form>

      <h3 className="h5 mb-3">Registros cadastrados</h3>

      {carregando && <p>Carregando registros...</p>}

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>

              {cfg.campos.map((campo) => (
                <th key={campo.nome}>{campo.rotulo}</th>
              ))}

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {!carregando && lista.length === 0 && (
              <tr>
                <td
                  colSpan={cfg.campos.length + 2}
                  className="text-center"
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}

            {lista.map((item) => (
              <tr key={item.Id}>
                <td>{item.Id}</td>

                {cfg.campos.map((campo) => {
                  const relacionado = campo.origem
                    ? (opcoes[campo.origem] ?? []).find(
                        (opcao) =>
                          Number(opcao.Id) ===
                          Number(item[campo.nome])
                      )
                    : null

                  return (
                    <td key={campo.nome}>
                      {campo.origem
                        ? relacionado
                          ? nomeItem(relacionado)
                          : `#${item[campo.nome] ?? ''}`
                        : String(item[campo.nome] ?? '')}
                    </td>
                  )
                })}

                <td className="text-nowrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => excluir(item.Id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
