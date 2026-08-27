import { useState } from 'react'

function Medicao() {

    const [safra, setSafra] = useState('')
    const [equipamento, setEquipamento] = useState('')
    const [tipoInformacao, setTipoInformacao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')

    const [erros, setErros] = useState({})
    const [mensagem, setMensagem] = useState('')


    function salvar(event) {

        event.preventDefault()

        const novosErros = {}


        if (safra === '') {
            novosErros.safra = 'Selecione a safra'
        }

        if (equipamento === '') {
            novosErros.equipamento =
                'Selecione o equipamento'
        }

        if (tipoInformacao === '') {
            novosErros.tipoInformacao =
                'Selecione o tipo de informação'
        }

        if (valor.trim() === '') {
            novosErros.valor = 'Informe o valor'
        }

        if (data === '') {
            novosErros.data = 'Informe a data'
        }


        setErros(novosErros)


        if (Object.keys(novosErros).length > 0) {
            setMensagem('')
            return
        }


        setMensagem('Medição cadastrada com sucesso!')
    }


    return (
        <section className="p-4">

            <h2 className="mb-4">
                Cadastro de Medição
            </h2>


            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}


            <form onSubmit={salvar}>


                {/* SAFRA */}
                <div className="mb-3">

                    <label className="form-label">
                        Safra
                    </label>

                    <select
                        className={`form-select ${
                            erros.safra ? 'is-invalid' : ''
                        }`}
                        value={safra}
                        onChange={(event) =>
                            setSafra(event.target.value)
                        }
                    >

                        <option value="">
                            Selecione
                        </option>

                        <option value="Safra 2025/2026">
                            Safra 2025/2026
                        </option>

                        <option value="Safra 2026/2027">
                            Safra 2026/2027
                        </option>

                    </select>

                    {erros.safra && (
                        <div className="invalid-feedback">
                            {erros.safra}
                        </div>
                    )}

                </div>


                {/* EQUIPAMENTO */}
                <div className="mb-3">

                    <label className="form-label">
                        Equipamento
                    </label>

                    <select
                        className={`form-select ${
                            erros.equipamento
                                ? 'is-invalid'
                                : ''
                        }`}
                        value={equipamento}
                        onChange={(event) =>
                            setEquipamento(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            Selecione
                        </option>

                        <option value="Equipamento 1">
                            Equipamento 1
                        </option>

                        <option value="Equipamento 2">
                            Equipamento 2
                        </option>

                    </select>

                    {erros.equipamento && (
                        <div className="invalid-feedback">
                            {erros.equipamento}
                        </div>
                    )}

                </div>


                {/* TIPO DE INFORMAÇÃO */}
                <div className="mb-3">

                    <label className="form-label">
                        Tipo de Informação
                    </label>

                    <select
                        className={`form-select ${
                            erros.tipoInformacao
                                ? 'is-invalid'
                                : ''
                        }`}
                        value={tipoInformacao}
                        onChange={(event) =>
                            setTipoInformacao(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            Selecione
                        </option>

                        <option value="Temperatura">
                            Temperatura
                        </option>

                        <option value="Umidade">
                            Umidade
                        </option>

                        <option value="Pressão">
                            Pressão
                        </option>

                    </select>

                    {erros.tipoInformacao && (
                        <div className="invalid-feedback">
                            {erros.tipoInformacao}
                        </div>
                    )}

                </div>


                {/* VALOR */}
                <div className="mb-3">

                    <label className="form-label">
                        Valor
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        className={`form-control ${
                            erros.valor ? 'is-invalid' : ''
                        }`}
                        value={valor}
                        onChange={(event) =>
                            setValor(event.target.value)
                        }
                    />

                    {erros.valor && (
                        <div className="invalid-feedback">
                            {erros.valor}
                        </div>
                    )}

                </div>


                {/* DATA */}
                <div className="mb-3">

                    <label className="form-label">
                        Data
                    </label>

                    <input
                        type="datetime-local"
                        className={`form-control ${
                            erros.data ? 'is-invalid' : ''
                        }`}
                        value={data}
                        onChange={(event) =>
                            setData(event.target.value)
                        }
                    />

                    {erros.data && (
                        <div className="invalid-feedback">
                            {erros.data}
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

export default Medicao