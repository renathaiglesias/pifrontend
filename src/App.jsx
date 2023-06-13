import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catador from './pages/Catador';
import Fornecedor from './pages/Fornecedor';
import Comprador from './pages/Comprador';
import Navegacao from './Navegacao';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import './Style.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navegacao />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catador" element={<Catador />} />
          <Route path="/fornecedor" element={<Fornecedor />} />
          <Route path="/comprador" element={<Comprador />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

