import React, { useState } from 'react';
import './EsqueciSenha.css';

const EsqueciMinhaSenha = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Lógica para enviar o email de recuperação de senha
        console.log('Email enviado para:', email);

        // Limpar o campo de email após o envio
        setEmail('');
    };

    return (
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
                <label htmlFor="email" className="esqueci-senha-label">
                    Senha:
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
    );
};

export default EsqueciMinhaSenha;
