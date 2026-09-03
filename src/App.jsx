import { useState } from "react";

import MenuLateral from "./components/MenuLateral";
import Conteudo from "./components/Conteudo";

import Safra from "./components/cadastros/Safra";
import Unidade from "./components/cadastros/Unidade";
import Equipamento from "./components/cadastros/Equipamento";
import Medicao from "./components/cadastros/Medicao";
import UnidadeMedida from "./components/cadastros/UnidadeMedida";
import TipoInformacao from "./components/cadastros/TipoInformacao";
import Indicadores from "./components/cadastros/Indicadores";
import Funcionarios from "./components/cadastros/Funcionarios";

function App() {
  const [menuAberto, setMenuAberto] = useState(true);
  const [tela, setTela] = useState("inicio");

  function alterarMenu() {
    setMenuAberto(!menuAberto);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#343a40",
      }}
    >

      {/* =========================
          BARRA SUPERIOR
      ========================== */}

      <header
        style={{
          height: "60px",
          background: "#292d32",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "23px",
            fontWeight: "700",
            letterSpacing: "0.3px",
          }}
        >
          Sistema React
        </h1>
      </header>


      {/* =========================
          ÁREA PRINCIPAL
      ========================== */}

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 60px)",
        }}
      >

        {/* MENU */}

        <MenuLateral
          aberto={menuAberto}
          setTela={setTela}
        />


        {/* CONTEÚDO */}

        <main
          style={{
            flex: 1,
            minWidth: 0,
            background: "#ffffff",
            transition: "0.2s",
          }}
        >

          {/* BOTÃO MENU */}

          <div
            style={{
              height: "1px",
              position: "relative",
            }}
          >
            <button
              onClick={alterarMenu}
              style={{
                position: "fixed",
                left: "-9999px",
              }}
            >
              Menu
            </button>
          </div>


          {/* =========================
              TELAS
          ========================== */}

          {tela === "inicio" && <Conteudo />}

          {tela === "safra" && <Safra />}

          {tela === "unidade" && <Unidade />}

          {tela === "equipamento" && <Equipamento />}

          {tela === "medicao" && <Medicao />}

          {tela === "unidadeMedida" && <UnidadeMedida />}

          {tela === "tipoInformacao" && <TipoInformacao />}

          {tela === "indicadores" && <Indicadores />}

          {tela === "funcionarios" && <Funcionarios />}

        </main>

      </div>
    </div>
  );
}

export default App;