import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebaseConfig";
import "../pages/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Redirecionar para a página adequada se o usuário estiver autenticado
        const userType = localStorage.getItem("userType");
        if (userType === "catador") {
          await navigate("/catador");
        } else if (userType === "fornecedor") {
          await navigate("/fornecedor");
        } else if (userType === "comprador") {
          await navigate("/comprador");
        }
      }
    };

    checkUserAuth();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      // Redirecionar para a página adequada após o login
      const userType = localStorage.getItem("userType");
      if (userType === "catador") {
        navigate("/catador");
      } else if (userType === "fornecedor") {
        navigate("/fornecedor");
      } else if (userType === "comprador") {
        navigate("/comprador");
      }
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
