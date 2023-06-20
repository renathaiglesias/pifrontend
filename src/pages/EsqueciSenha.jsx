import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './EsqueciSenha.css';

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar email de redefinição de senha
      await sendPasswordResetEmail(auth, email);

      // Limpar o campo de email após o envio
      setEmail('');

      console.log('Email de redefinição de senha enviado para:', email);
    } catch (error) {
      console.error('Erro ao enviar email de redefinição de senha:', error);
    }
  };

  return (
    <div className="esquecisenha-page">
      <div className="esqueci-senha-container">
        <h2 className="esqueci-senha-title">Redefinir Senha</h2>
        <form className="esqueci-senha-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="esqueci-senha-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="esqueci-senha-input"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className="esqueci-senha-button">
            Redefinir
          </button>
        </form>
      </div>
    </div>
  );
};

export default EsqueciMinhaSenha;
