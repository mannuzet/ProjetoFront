
const API_URL = 'http://localhost:1880/api/indicadores'

async function requisicao(url, opcoes = {}) {
  let resposta

  try {
    resposta = await fetch(url, opcoes)
  } catch {
    throw new Error(
      'Não foi possível conectar à API. Verifique se o Node-RED está ligado e se o endereço está correto.'
    )
  }

  if (!resposta.ok) {
    const detalhe = await resposta.text()
    throw new Error(detalhe || `Erro HTTP ${resposta.status}`)
  }

  if (resposta.status === 204) {
    return null
  }

  const texto = await resposta.text()
  return texto ? JSON.parse(texto) : null
}

export const indicadorService = {
  listar: () => requisicao(API_URL),

  consultar: (id) =>
    requisicao(`${API_URL}/${id}`),

  cadastrar: (dados) =>
    requisicao(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    }),

  atualizar: (id, dados) =>
    requisicao(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    }),

  excluir: (id) =>
    requisicao(`${API_URL}/${id}`, {
      method: 'DELETE',
    }),
}
