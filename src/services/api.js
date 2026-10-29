const BASE = 'http://127.0.0.1:1880'

export const ROTAS = {
  safras: '/api/safras',
  unidades: '/api/unidades',
  unidadesMedida: '/api/unidades-medida',

  equipamentos: '/api/equipamentos',
  tiposInformacao: '/api/tipoinformacoes',
  medicoes: '/api/medicoes',
}

export async function api(
  recurso,
  metodo = 'GET',
  dados = null,
  id = null
) {
  const rota = ROTAS[recurso]

  if (!rota) {
    throw new Error(
      `Configure a rota de ${recurso} no arquivo api.js`
    )
  }

  const url = `${BASE}${rota}${id == null ? '' : `/${id}`}`

  let resposta

  try {
    resposta = await fetch(url, {
      method: metodo,
      headers: dados == null
        ? undefined
        : { 'Content-Type': 'application/json' },
      body: dados == null
        ? undefined
        : JSON.stringify(dados),
    })
  } catch {
    throw new Error(
      'Não foi possível conectar ao Node-RED. Verifique se ele está ligado.'
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

  if (!texto) {
    return null
  }

  try {
    return JSON.parse(texto)
  } catch {
    throw new Error('A API não retornou um JSON válido.')
  }
}