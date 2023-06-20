import React, { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebaseConfig";
import "../pages/InformacoesAdicionais.css";

const InformacoesAdicionais = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [genero, setGenero] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const navigate = useNavigate(); // Obter a função navigate

  const handleInformacoes = async (event) => {
    event.preventDefault();

    try {
      // Obter o ID do usuário atualmente autenticado
      const userId = ""; // Obtenha o ID do usuário autenticado usando o Firebase Auth

      // Salvar as informações adicionais no Firestore
      await updateDoc(doc(firestore, "usuarios", userId), {
        cep,
        endereco,
        cpf,
        rg,
        genero,
        tipoUsuario,
      });

      // Redirecionar para outra página
      navigate("/outra-pagina");
    } catch (error) {
      console.error("Erro ao salvar informações adicionais:", error);
    }
  };

  return (
    <div className="informacoes-adicionais-page">
      <div className="informacoes-adicionais-container">
        <h2 className="informacoes-adicionais-title">Informações Adicionais</h2>
        <form className="informacoes-adicionais-form" onSubmit={handleInformacoes}>
          <label className="informacoes-adicionais-label" htmlFor="cep">CEP:</label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="cep"
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="endereco">Endereço:</label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="endereco"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="cpf">CPF:</label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="cpf"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="rg">RG:</label>
          <input
            className="informacoes-adicionais-input"
            type="text"
            id="rg"
            value={rg}
            onChange={(event) => setRg(event.target.value)}
            required
          />

          <label className="informacoes-adicionais-label" htmlFor="genero">Gênero:</label>
          <select
            className="informacoes-adicionais-select"
            id="genero"
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
            required
          >
            <option className="informacoes-adicionais-option" value="">Selecione</option>
            <option className="informacoes-adicionais-option" value="homem">Homem</option>
            <option className="informacoes-adicionais-option" value="mulher">Mulher</option>
          </select>

          <label className="informacoes-adicionais-label" htmlFor="tipoUsuario">Tipo de Usuário:</label>
          <select
            className="informacoes-adicionais-select"
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(event) => setTipoUsuario(event.target.value)}
            required
          >
            <option className="informacoes-adicionais-option" value="">Selecione</option>
            <option className="informacoes-adicionais-option" value="catador">Catador</option>
            <option className="informacoes-adicionais-option" value="fornecedor">Fornecedor</option>
            <option className="informacoes-adicionais-option" value="comprador">Comprador</option>
          </select>

          <button className="informacoes-adicionais-button" type="submit">Continuar</button>
        </form>
      </div>
    </div>
  );
};

export default InformacoesAdicionais;
