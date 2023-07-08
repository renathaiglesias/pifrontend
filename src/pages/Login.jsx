import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseConfig, firestore } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
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
          navigate("/catador");
        } else if (userType === "fornecedor") {
          navigate("/fornecedor");
        } else if (userType === "comprador") {
          navigate("/comprador");
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

      const user = auth.currentUser;

      if (user) {
        // Obter o tipo de usuário a partir do Firestore
        const userTypeDoc = await getDoc(doc(firestore, "usuarios", user.uid));
        const userType = userTypeDoc.data().tipoUsuario;

        // Redirecionar para a página adequada após o login
        if (userType === "catador") {
          navigate("/catador");
        } else if (userType === "fornecedor") {
          navigate("/fornecedor");
        } else if (userType === "comprador") {
          navigate("/comprador");
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      // Verificar o tipo de erro e exibir a mensagem adequada
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        alert("E-mail não cadastrado ou inválido. Por favor, verifique e tente novamente.");
      } else if (error.code === "auth/wrong-password") {
        alert("Senha incorreta. Por favor, verifique a senha e tente novamente.");
      } else {
        alert("Erro ao fazer login. Por favor, tente novamente.");
      }
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
            Senha:
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
