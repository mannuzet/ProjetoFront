import { useRef, useState } from "react";

function Funcionarios() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [erroCamera, setErroCamera] = useState("");
  const [cameraAberta, setCameraAberta] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  function selecionarFoto(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
      setFoto(arquivo);
      setPreviewFoto(URL.createObjectURL(arquivo));
      setErroCamera("");
    }
  }

  async function abrirCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      setCameraAberta(true);
      setErroCamera("");
    } catch (erro) {
      setErroCamera(
        "Não foi possível acessar a câmera."
      );
    }
  }

  function capturarFoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imagem = canvas.toDataURL("image/jpeg");

    setPreviewFoto(imagem);
    setFoto(imagem);

    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
    }

    setCameraAberta(false);
  }

  function cadastrarFuncionario(event) {
    event.preventDefault();

    console.log({
      nome,
      email,
      telefone,
      foto,
    });

    alert("Funcionário cadastrado!");

    setNome("");
    setEmail("");
    setTelefone("");
    setFoto(null);
    setPreviewFoto(null);
  }

  return (
    <div
      style={{
        padding: "28px 36px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >

      {/* TÍTULO */}

      <h1
        style={{
          margin: "0 0 18px",
          fontSize: "25px",
          color: "#343a40",
          fontWeight: "700",
          letterSpacing: "0.3px",
        }}
      >
        Cadastro de Funcionário
      </h1>


      <form onSubmit={cadastrarFuncionario}>

        {/* ÁREA PRINCIPAL */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(350px, 1fr) 250px",
            gap: "55px",
            maxWidth: "650px",
          }}
        >

          {/* =========================
              DADOS
          ========================== */}

          <div>

            {/* NOME */}

            <div
              style={{
                marginBottom: "14px",
              }}
            >

              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#4b5563",
                }}
              >
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                required
                style={{
                  width: "100%",
                  height: "33px",
                  padding: "5px 10px",
                  boxSizing: "border-box",
                  border: "1px solid #dce5ee",
                  outline: "none",
                  fontSize: "13px",
                  color: "#343a40",
                  background: "#ffffff",
                }}
              />

            </div>


            {/* EMAIL */}

            <div
              style={{
                marginBottom: "14px",
              }}
            >

              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#4b5563",
                }}
              >
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                style={{
                  width: "100%",
                  height: "33px",
                  padding: "5px 10px",
                  boxSizing: "border-box",
                  border: "1px solid #dce5ee",
                  outline: "none",
                  fontSize: "13px",
                  background: "#ffffff",
                }}
              />

            </div>


            {/* TELEFONE */}

            <div
              style={{
                marginBottom: "14px",
              }}
            >

              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#4b5563",
                }}
              >
                Telefone
              </label>

              <input
                type="text"
                value={telefone}
                onChange={(event) =>
                  setTelefone(event.target.value)
                }
                required
                style={{
                  width: "100%",
                  height: "33px",
                  padding: "5px 10px",
                  boxSizing: "border-box",
                  border: "1px solid #dce5ee",
                  outline: "none",
                  fontSize: "13px",
                  background: "#ffffff",
                }}
              />

            </div>


            {/* BOTÃO CADASTRAR */}

            <button
              type="submit"
              style={{
                marginTop: "42px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                background: "#168df5",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Cadastrar
            </button>

          </div>


          {/* =========================
              FOTO
          ========================== */}

          <div>

            <label
              style={{
                display: "block",
                marginBottom: "16px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#4b5563",
              }}
            >
              Foto
            </label>


            {/* PREVIEW */}

            <div
              style={{
                width: "158px",
                height: "158px",
                border: "1px solid #d9e3ed",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                overflow: "hidden",
                marginBottom: "18px",
              }}
            >

              {previewFoto ? (
                <img
                  src={previewFoto}
                  alt="Foto do funcionário"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="38"
                    r="22"
                    fill="#dfeaf6"
                  />

                  <path
                    d="
                      M25 105
                      C28 78 42 64 60 64
                      C78 64 92 78 95 105
                      Z
                    "
                    fill="#dfeaf6"
                  />
                </svg>
              )}

            </div>


            {/* BOTÕES */}

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >

              {/* SELECIONAR */}

              <label
                style={{
                  padding: "9px 15px",
                  borderRadius: "6px",
                  background: "#168df5",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Selecionar

                <input
                  type="file"
                  accept="image/*"
                  onChange={selecionarFoto}
                  style={{
                    display: "none",
                  }}
                />
              </label>


              {/* CÂMERA */}

              <button
                type="button"
                onClick={abrirCamera}
                style={{
                  padding: "9px 16px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#1caf72",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Câmera
              </button>

            </div>

          </div>

        </div>


        {/* =========================
            CÂMERA
        ========================== */}

        {cameraAberta && (
          <div
            style={{
              marginTop: "25px",
              width: "500px",
              padding: "15px",
              background: "#454d55",
              borderRadius: "8px",
            }}
          >

            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                display: "block",
                borderRadius: "5px",
                background: "#000000",
              }}
            />

            <button
              type="button"
              onClick={capturarFoto}
              style={{
                marginTop: "12px",
                padding: "9px 18px",
                border: "none",
                borderRadius: "5px",
                background: "#168df5",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Capturar foto
            </button>

          </div>
        )}


        <canvas
          ref={canvasRef}
          style={{
            display: "none",
          }}
        />


        {/* ERRO DA CÂMERA */}

        {erroCamera && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px 14px",
              width: "fit-content",
              background: "#fff3cd",
              color: "#856404",
              border: "1px solid #ffeeba",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            {erroCamera}
          </div>
        )}

      </form>

    </div>
  );
}

export default Funcionarios;