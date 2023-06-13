import React from 'react';
import './Login.css';

const Login = () => {
  const handleLogin = () => {
    // Lógica de autenticação de login
  };

  return (
    <div>
        <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email" className="login-label">
            Email:
            </label>
            <input type="email" id="email" className="login-input" required />

            <label htmlFor="password" className="login-label">
            Password:
            </label>
            <input type="password" id="password" className="login-input" required />

            <button type="submit" className="login-button">Login</button>
        </form>
        </div>
    </div>
  );
};

export default Login;
