import { useEffect, useState } from 'react'
import { indicadorService } from '../../services/indicadorService'

const vazio = {
  Nome: '',
  Descricao: '',
  Url: '',
}

export default function Indicadores({ atualizarMenu }) {
  const [itens, setItens] = useState([])
  const [form, setForm] = useState({ ...vazio })
  const [idEdicao, setIdEdicao] = useState(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function carregar() {
    try {
      setCarregando(true)

      const dados = await indicadorService.listar()

      if (!Array.isArray(dados)) {
        throw new Error('A API não retornou uma lista')
      }

      setItens(dados)
      setErro('')
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  function alterar(event) {
    const { name, value } = event.target

    setForm(anterior => ({
      ...anterior,
      [name]: value,
    }))
  }

  async function salvar(event) {
    event.preventDefault()

    try {
      new URL(form.Url)

      if (!/^https?:\/\//i.test(form.Url)) {
        throw new Error(
          'A URL deve começar com http:// ou https://'
        )
      }

      if (idEdicao === null) {
        await indicadorService.cadastrar(form)
      } else {
        await indicadorService.atualizar(idEdicao, {
          Id: idEdicao,
          ...form,
        })
      }

      setForm({ ...vazio })
      setIdEdicao(null)

      await carregar()
      await atualizarMenu()
    } catch (e) {
      setErro(e.message || 'Falha ao salvar')
    }
  }

  function editar(item) {
    setIdEdicao(item.Id)

    setForm({
      Nome: item.Nome,
      Descricao: item.Descricao,
      Url: item.Url,
    })
  }

  async function excluir(id) {
    if (!window.confirm('Excluir este indicador?')) {
      return
    }

    try {
      await indicadorService.excluir(id)

      await carregar()
      await atualizarMenu()
    } catch (e) {
      setErro(e.message)
    }
  }

  return (
    <section className="p-4">
      <h2>Cadastro de Indicadores</h2>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <form
        className="card card-body mb-4"
        onSubmit={salvar}
      >
        <label className="form-label">Nome</label>

        <input
          name="Nome"
          value={form.Nome}
          onChange={alterar}
          className="form-control mb-3"
          required
          maxLength={100}
        />

        <label className="form-label">Descrição</label>

        <textarea
          name="Descricao"
          value={form.Descricao}
          onChange={alterar}
          className="form-control mb-3"
        />

        <label className="form-label">
          URL do indicador
        </label>

        <input
          name="Url"
          type="url"
          value={form.Url}
          onChange={alterar}
          className="form-control mb-3"
          placeholder="https://..."
          required
        />

        <div>
          <button className="btn btn-primary me-2">
            {idEdicao === null
              ? 'Cadastrar'
              : 'Salvar alterações'}
          </button>

          {idEdicao !== null && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIdEdicao(null)
                setForm({ ...vazio })
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {carregando && <p>Carregando...</p>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>URL</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {itens.map(item => (
              <tr key={item.Id}>
                <td>{item.Nome}</td>
                <td>{item.Descricao}</td>

                <td className="text-break">
                  {item.Url}
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
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