import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebaseConfig";
import "../pages/Login.css";

const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Fazer a autenticação do usuário usando o Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Redirecionar para outra página após o login bem-sucedido
      navigate("/catador");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>
          <div className="login-links">
          <a href="/esqueci" className="login-link">Esqueci minha senha</a>
          <span className="login-link-separator">|</span>
          <a href="/cadastro" className="login-link">Cadastre-se agora</a>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
