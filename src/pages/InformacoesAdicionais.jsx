import React, { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebaseConfig";
import "../pages/InformacoesAdicionais.css";

const InformacoesAdicionais = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [genero, setGenero] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [tipoUsuarioError, setTipoUsuarioError] = useState("");
  const navigate = useNavigate(); // Obter a função navigate

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Redirecionar para a página de login se o usuário não estiver autenticado
        navigate("/login");
      }
    });

    // Limpar o listener do useEffect quando o componente for desmontado
    return () => unsubscribe();
  }, [navigate]);

  const handleInformacoes = async (event) => {
    event.preventDefault();

    // Validar o CEP (8 dígitos)
    if (cep.length !== 8) {
      alert("O CEP deve ter 8 dígitos");
      return;
    }

    // Validar o CPF (11 dígitos)
    if (cpf.length !== 11) {
      alert("O CPF deve ter 11 dígitos");
      return;
    }

    // Validar o RG (7 dígitos)
    if (rg.length !== 7) {
      alert("O RG deve ter 7 dígitos");
      return;
    }

    // Verificar se o tipo de usuário foi selecionado
    if (!tipoUsuario) {
      setTipoUsuarioError("Selecione o tipo de usuário");
      return;
    } else {
      setTipoUsuarioError("");
    }

    try {
      // Obter o ID do usuário atualmente autenticado
      const userId = auth.currentUser.uid;

      // Salvar as informações adicionais no Firestore
      await updateDoc(doc(firestore, "usuarios", userId), {
        cep,
        endereco,
        cpf,
        rg,
        genero,
        tipoUsuario,
      });

      localStorage.setItem("userType", tipoUsuario);

      // Redirecionar para a página com base no tipo de usuário selecionado
      if (tipoUsuario === "catador") {
        navigate("/catador");
      } else if (tipoUsuario === "fornecedor") {
        navigate("/fornecedor");
      } else if (tipoUsuario === "comprador") {
        navigate("/comprador");
      }
    } catch (error) {
      console.error("Erro ao salvar informações adicionais:", error);
    }
  };

  return (
    <div className="informacoes-adicionais-page">
      <div className="informacoes-adicionais-container">
        <h2 className="informacoes-adicionais-title">Informações Adicionais</h2>
        <form className="informacoes-adicionais-form" onSubmit={handleInformacoes}>
          <label className="informacoes-adicionais-label" htmlFor="cep">
            CEP:
          </label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="cep"
            value={cep}
            onChange={(event) => setCep(event.target.value.replace(/\D/g, "").slice(0, 8))}
            maxLength={8}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="endereco">
            Endereço:
          </label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="endereco"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="cpf">
            CPF:
          </label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="cpf"
            value={cpf}
            onChange={(event) => setCpf(event.target.value.replace(/\D/g, "").slice(0, 11))}
            maxLength={11}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="rg">
            RG:
          </label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="rg"
            value={rg}
            onChange={(event) => setRg(event.target.value.replace(/\D/g, "").slice(0, 7))}
            maxLength={7}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="genero">
            Gênero:
          </label>
          <select
            className="informacoes-adicionais-select"
            id="genero"
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
            required
          >
            <option className="informacoes-adicionais-option" value="">
              Selecione
            </option>
            <option className="informacoes-adicionais-option" value="homem">
              Homem
            </option>
            <option className="informacoes-adicionais-option" value="mulher">
              Mulher
            </option>
          </select>

          <label className="informacoes-adicionais-label" htmlFor="tipoUsuario">
            Tipo de Usuário:
          </label>
          <select
            className="informacoes-adicionais-select"
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(event) => setTipoUsuario(event.target.value)}
            required
          >
            <option className="informacoes-adicionais-option" value="">
              Selecione
            </option>
            <option className="informacoes-adicionais-option" value="catador">
              Catador
            </option>
            <option className="informacoes-adicionais-option" value="fornecedor">
              Fornecedor
            </option>
            <option className="informacoes-adicionais-option" value="comprador">
              Comprador
            </option>
          </select>

          {tipoUsuarioError && <p className="informacoes-adicionais-error">{tipoUsuarioError}</p>}

          <button className="informacoes-adicionais-button" type="submit">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default InformacoesAdicionais;