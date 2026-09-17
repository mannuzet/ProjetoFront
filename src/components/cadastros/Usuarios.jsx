import { useRef, useState } from "react";

function Usuarios() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [foto, setFoto] = useState("");

  const [cameraAberta, setCameraAberta] = useState(false);
  const [erroCamera, setErroCamera] = useState("");
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Selecionar foto do computador
  function selecionarFoto(event) {
    const arquivo = event.target.files[0];

    if (!arquivo) {
      return;
    }

    if (!arquivo.type.startsWith("image/")) {
      setErroCamera("Selecione um arquivo de imagem.");
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setFoto(leitor.result);
      setErroCamera("");
      setErros((errosAnteriores) => ({
        ...errosAnteriores,
        foto: "",
      }));
    };

    leitor.readAsDataURL(arquivo);
  }

  // Abrir câmera
  async function abrirCamera() {
    try {
      setErroCamera("");

      if (!navigator.mediaDevices) {
        setErroCamera(
          "Seu navegador não permite acesso à câmera."
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      setCameraAberta(true);

      // Espera a câmera aparecer na tela
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (erro) {
      setErroCamera(
        "Não foi possível acessar a câmera. Verifique a permissão ou selecione uma foto."
      );
    }
  }

  // Capturar foto da câmera
  function capturarFoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setErroCamera(
        "A câmera ainda não está pronta. Aguarde um momento."
      );
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imagem = canvas.toDataURL("image/jpeg", 0.8);

    setFoto(imagem);

    setErros((errosAnteriores) => ({
      ...errosAnteriores,
      foto: "",
    }));

    fecharCamera();
  }

  // Fechar câmera
  function fecharCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraAberta(false);
  }

  // Salvar usuário
  function salvar(event) {
    event.preventDefault();

    const novosErros = {};

    if (nome.trim() === "") {
      novosErros.nome = "Informe o nome.";
    }

    if (email.trim() === "") {
      novosErros.email = "Informe o e-mail.";
    } else if (!email.includes("@")) {
      novosErros.email = "Informe um e-mail válido.";
    }

    if (senha.length < 6) {
      novosErros.senha =
        "A senha deve ter pelo menos 6 caracteres.";
    }

    if (confirmarSenha === "") {
      novosErros.confirmarSenha =
        "Confirme a senha.";
    } else if (senha !== confirmarSenha) {
      novosErros.confirmarSenha =
        "As senhas não são iguais.";
    }

    if (foto === "") {
      novosErros.foto =
        "Selecione ou capture uma foto.";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagem("");
      return;
    }

    const usuario = {
      nome: nome.trim(),
      email: email.trim(),
      senha: senha,
      foto: foto,
    };

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuario)
    );

    setMensagem(
      "Usuário cadastrado com sucesso!"
    );

    // Limpar formulário
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setFoto("");
    setErros({});

    // Limpar input de arquivo
    const inputFoto = document.getElementById(
      "fotoUsuario"
    );

    if (inputFoto) {
      inputFoto.value = "";
    }
  }

  return (
    <section className="p-4">
      <h2 className="mb-4">
        Cadastro de Usuário
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
              erros.nome ? "is-invalid" : ""
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

        {/* E-MAIL */}

        <div className="mb-3">
          <label className="form-label">
            E-mail
          </label>

          <input
            type="email"
            className={`form-control ${
              erros.email ? "is-invalid" : ""
            }`}
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          {erros.email && (
            <div className="invalid-feedback">
              {erros.email}
            </div>
          )}
        </div>

        {/* SENHA */}

        <div className="mb-3">
          <label className="form-label">
            Senha
          </label>

          <input
            type="password"
            className={`form-control ${
              erros.senha ? "is-invalid" : ""
            }`}
            value={senha}
            onChange={(event) =>
              setSenha(event.target.value)
            }
          />

          {erros.senha && (
            <div className="invalid-feedback">
              {erros.senha}
            </div>
          )}
        </div>

        {/* CONFIRMAR SENHA */}

        <div className="mb-3">
          <label className="form-label">
            Confirmar senha
          </label>

          <input
            type="password"
            className={`form-control ${
              erros.confirmarSenha
                ? "is-invalid"
                : ""
            }`}
            value={confirmarSenha}
            onChange={(event) =>
              setConfirmarSenha(
                event.target.value
              )
            }
          />

          {erros.confirmarSenha && (
            <div className="invalid-feedback">
              {erros.confirmarSenha}
            </div>
          )}
        </div>

        {/* FOTO */}

        <div className="mb-3">
          <label className="form-label">
            Foto
          </label>

          <input
            id="fotoUsuario"
            type="file"
            accept="image/*"
            className={`form-control ${
              erros.foto ? "is-invalid" : ""
            }`}
            onChange={selecionarFoto}
          />

          {erros.foto && (
            <div className="invalid-feedback">
              {erros.foto}
            </div>
          )}
        </div>

        {/* CÂMERA */}

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={abrirCamera}
          >
            Usar câmera
          </button>
        </div>

        {erroCamera && (
          <div className="alert alert-warning">
            {erroCamera}
          </div>
        )}

        {/* VÍDEO DA CÂMERA */}

        {cameraAberta && (
          <div className="mb-3">

            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="img-thumbnail mb-2"
              style={{
                width: "320px",
                maxWidth: "100%",
              }}
            />

            <div>
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={capturarFoto}
              >
                Capturar foto
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={fecharCamera}
              >
                Fechar câmera
              </button>
            </div>

          </div>
        )}

        {/* CANVAS INVISÍVEL */}

        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
        />

        {/* PRÉ-VISUALIZAÇÃO */}

        {foto && (
          <div className="mb-3">

            <p className="mb-2">
              Pré-visualização:
            </p>

            <img
              src={foto}
              alt="Foto do usuário"
              className="img-thumbnail"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
              }}
            />

          </div>
        )}

        {/* BOTÃO CADASTRAR */}

        <button
          type="submit"
          className="btn btn-primary"
        >
          Cadastrar usuário
        </button>

      </form>
    </section>
  );
}

export default Usuarios;