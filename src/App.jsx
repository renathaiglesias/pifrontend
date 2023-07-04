import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catador from './pages/Catador';
import Fornecedor from './pages/Fornecedor';
import Comprador from './pages/Comprador';
import Navegacao from './Navegacao';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Footer from './Footer';
import EsqueciMinhaSenha from './pages/EsqueciSenha';
import InformacoesAdicionais from "./pages/InformacoesAdicionais";
import Perfil from "./pages/Perfil"
import './Style.css';
import 'react-bootstrap-icons';
import CadastroProduto from './pages/CadastroProduto';
import Anuncios from './pages/Anuncios';
import MeusAnuncios from './pages/MeusAnuncios';


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
          <Route path="/esqueci" element={<EsqueciMinhaSenha />} />
          <Route
            path="/informacoes-adicionais"
            element={<InformacoesAdicionais />}
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/cadastroproduto" element={<CadastroProduto />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/meusanuncios" element={<MeusAnuncios />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};



export default App;
