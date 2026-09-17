import { useState } from "react";

function MenuLateral({ aberto, setTela }) {
  const [cadastroAberto, setCadastroAberto] = useState(true);

  function alterarCadastro() {
    setCadastroAberto(!cadastroAberto);
  }

  const itens = [
    {
      nome: "Funcionários",
      tela: "funcionarios",
    },
    {
      nome: "Usuários",
      tela: "usuarios",
    },
    {
      nome: "Safra",
      tela: "safra",
    },
    {
      nome: "Unidade",
      tela: "unidade",
    },
    {
      nome: "Equipamento",
      tela: "equipamento",
    },
    {
      nome: "Medição",
      tela: "medicao",
    },
    {
      nome: "Unidade de Medida",
      tela: "unidadeMedida",
    },
    {
      nome: "Tipo de Informação",
      tela: "tipoInformacao",
    },
    {
      nome: "Indicadores",
      tela: "indicadores",
    },
  ];

  if (!aberto) {
    return null;
  }

  return (
    <aside
      style={{
        width: "230px",
        minWidth: "230px",
        minHeight: "calc(100vh - 60px)",
        background: "#454d55",
        color: "#ffffff",
        padding: "28px 20px",
        boxSizing: "border-box",
      }}
    >

      {/* TÍTULO */}

      <h2
        style={{
          margin: "0 0 20px 5px",
          fontSize: "15px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#ffffff",
        }}
      >
        Menu
      </h2>

      {/* INÍCIO */}

      <button
        onClick={() => setTela("inicio")}
        style={{
          width: "100%",
          height: "35px",
          marginBottom: "7px",
          padding: "0 15px",
          border: "none",
          borderRadius: "6px",
          background: "#68737d",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: "600",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        Início
      </button>

      {/* CADASTRO */}

      <button
        onClick={alterarCadastro}
        style={{
          width: "100%",
          height: "35px",
          marginBottom: "7px",
          padding: "0 15px",
          border: "none",
          borderRadius: "6px",
          background: "#68737d",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: "600",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        Cadastro {cadastroAberto ? "▼" : "▶"}
      </button>

      {/* SUBMENU */}

      {cadastroAberto && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {itens.map((item) => (
            <button
              key={item.tela}
              onClick={() => setTela(item.tela)}
              style={{
                width: "100%",
                minHeight: "35px",
                padding: "7px 14px",
                border: "1px solid #59636d",
                borderRadius: "6px",
                background: "transparent",
                color: "#f1f3f5",
                fontSize: "13px",
                textAlign: "left",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              {item.nome}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default MenuLateral;