import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Seja bem-vindo ao nosso site de reciclagem!</h1>
      <p>Por favor, escolha uma opção abaixo para se cadastrar:</p>
      <ul>
        <li>
          <Link to="/compradores">Sou um comprador</Link>
        </li>
        <li>
          <Link to="/catadores">Sou um catador</Link>
        </li>
        <li>
          <Link to="/fornecedores">Sou um fornecedor</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;