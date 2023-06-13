import React from 'react';
import { Link } from 'react-router-dom';

const Navegacao = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catador">Catador</Link>
        </li>
        <li>
          <Link to="/fornecedor">Fornecedor</Link>
        </li>
        <li>
          <Link to="/comprador">Comprador</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navegacao;
