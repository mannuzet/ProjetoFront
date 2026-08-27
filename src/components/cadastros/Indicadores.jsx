import { useState } from 'react'

function Indicadores() {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [url, setUrl] = useState('')

    const [erros, setErros] = useState({})
    const [mensagem, setMensagem] = useState('')


    function salvar(event) {

        event.preventDefault()

        const novosErros = {}


        if (nome.trim() === '') {
            novosErros.nome = 'Informe o nome do indicador'
        }

        if (descricao.trim() === '') {
            novosErros.descricao =
                'Informe a descrição do indicador'
        }

        if (url.trim() === '') {
            novosErros.url = 'Informe a URL'
        }


        setErros(novosErros)


        if (Object.keys(novosErros).length > 0) {
            setMensagem('')
            return
        }


        setMensagem(
            'Indicador cadastrado com sucesso!'
        )
    }


    return (
        <section className="p-4">

            <h2 className="mb-4">
                Cadastro de Indicadores
            </h2>


            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}


            <form onSubmit={salvar}>


                {/* NOME */}
                <div className="mb-3">

                    <label className="form-label">
                        Nome
                    </label>

                    <input
                        type="text"
                        className={`form-control ${
                            erros.nome ? 'is-invalid' : ''
                        }`}
                        value={nome}
                        onChange={(event) =>
                            setNome(event.target.value)
                        }
                    />

                    {erros.nome && (
                        <div className="invalid-feedback">
                            {erros.nome}
                        </div>
                    )}

                </div>


                {/* DESCRIÇÃO */}
                <div className="mb-3">

                    <label className="form-label">
                        Descrição
                    </label>

                    <textarea
                        className={`form-control ${
                            erros.descricao
                                ? 'is-invalid'
                                : ''
                        }`}
                        rows="4"
                        value={descricao}
                        onChange={(event) =>
                            setDescricao(
                                event.target.value
                            )
                        }
                    />

                    {erros.descricao && (
                        <div className="invalid-feedback">
                            {erros.descricao}
                        </div>
                    )}

                </div>


                {/* URL */}
                <div className="mb-3">

                    <label className="form-label">
                        URL
                    </label>

                    <input
                        type="url"
                        className={`form-control ${
                            erros.url ? 'is-invalid' : ''
                        }`}
                        value={url}
                        onChange={(event) =>
                            setUrl(event.target.value)
                        }
                    />

                    {erros.url && (
                        <div className="invalid-feedback">
                            {erros.url}
                        </div>
                    )}

                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Cadastrar
                </button>

            </form>

        </section>
    )
}

export default Indicadores