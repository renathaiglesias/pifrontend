import React, { useState } from 'react';
import './Cadastro.css';


const Cadastro = () => {
  const [tipoCadastro, setTipoCadastro] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleTipoCadastro = (event) => {
    setTipoCadastro(event.target.value);
  };

  const handleCadastro = (event) => {
    event.preventDefault();

    // Executar a lógica de cadastro com os dados fornecidos pelo usuário
    const dadosCadastro = {
      tipo: tipoCadastro,
      nome,
      email,
      senha
    };

    console.log('Dados de cadastro:', dadosCadastro);
    
    // Aqui você pode fazer uma requisição ao servidor ou salvar os dados localmente

    // Limpar os campos após o cadastro
    setTipoCadastro('');
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <label htmlFor="tipo">Escolha o tipo de cadastro:</label>
        <select id="tipo" onChange={handleTipoCadastro} value={tipoCadastro} required>
          <option value="">Selecione</option>
          <option value="fornecedor">Fornecedor</option>
          <option value="comprador">Comprador</option>
          <option value="catador">Catador</option>
        </select>

        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={nome} onChange={(event) => setNome(event.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" value={senha} onChange={(event) => setSenha(event.target.value)} required />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
