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
        <div className="form-group">
          <label htmlFor="tipo">Escolha o tipo de cadastro:</label>
          <select
            id="tipo"
            className="form-control"
            onChange={handleTipoCadastro}
            value={tipoCadastro}
            required
          >
            <option value="">Selecione</option>
            <option value="fornecedor">Fornecedor</option>
            <option value="comprador">Comprador</option>
            <option value="catador">Catador</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
