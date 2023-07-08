import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebaseConfig";
import "../pages/Cadastro.css";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Obter a função navigate

  const handleCadastro = async (event) => {
    event.preventDefault();

    try {
      // Criação do usuário com email e senha
      const { user } = await createUserWithEmailAndPassword(auth, email, senha);

      // Salvar os dados de cadastro no Firestore
      await setDoc(doc(firestore, "usuarios", user.uid), {
        nome,
        email,
      });

      // Limpar os campos após o cadastro
      setNome("");
      setEmail("");
      setSenha("");

      // Redirecionar para a página de informações adicionais
      navigate("/informacoes-adicionais");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);

      // Verificar o tipo de erro e exibir a mensagem adequada
      if (error.code === "auth/email-already-in-use") {
        alert("O e-mail já está cadastrado. Por favor, tente outro e-mail.");
      } else if (error.code === "auth/invalid-email") {
        alert("O e-mail informado não é válido. Por favor, verifique e tente novamente.");
      } else {
        alert("Erro ao cadastrar. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleCadastro}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
