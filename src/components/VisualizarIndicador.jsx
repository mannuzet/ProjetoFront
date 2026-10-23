
function VisualizarIndicador({ indicador }) {
  if (!indicador) {
    return (
      <section className="p-4">
        <h2>Visualizar indicador</h2>
        <p>Selecione um indicador no menu lateral.</p>
      </section>
    )
  }

  const url = indicador.Url

  let urlValida = false

  try {
    const endereco = new URL(url)

    urlValida = ['http:', 'https:'].includes(
      endereco.protocol
    )
  } catch {
    urlValida = false
  }

  if (!urlValida) {
    return (
      <section className="p-4">
        <div className="alert alert-danger">
          A URL deste indicador é inválida.
        </div>
      </section>
    )
  }

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
        <div>
          <h2>{indicador.Nome}</h2>
          <p className="text-muted mb-0">
            {indicador.Descricao}
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
        >
          Abrir em nova aba
        </a>
      </div>

      <div
        className="border rounded overflow-hidden"
        style={{ background: '#ffffff' }}
      >
        <iframe
          title={indicador.Nome}
          src={url}
          style={{
            display: 'block',
            width: '100%',
            height: '75vh',
            minHeight: '400px',
            border: 'none',
          }}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <p className="text-muted small mt-2">
        Se o painel não aparecer, o site pode impedir
        a exibição dentro de outros aplicativos.
        Nesse caso, utilize o botão para abri-lo em
        uma nova aba.
      </p>
    </section>
  )
}

export default VisualizarIndicador
