import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FiHome, FiUser, FiLogOut, FiLogIn } from 'react-icons/fi';
import { FaRecycle } from 'react-icons/fa';
import logo from './images/logo.png';
import './Navegacao.css';
import { auth, firestore } from './firebaseConfig';

function Navegacao() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getProfileUrl = () => {
    if (currentUser) {
      return '/perfil';
    }

    return '/cadastro';
  };

  const renderMeusAnunciosButton = () => {
    if (isLoggedIn) {
      return (
        <Button as={NavLink} to="/meusanuncios" variant="success" style={{ marginRight: '10px' }}>
          Meus Anúncios
        </Button>
      );
    }

    return null;
  };

  return (
    <Navbar className="custom-navbar navbar" expand="lg" variant="">
      <Container>
        <Navbar.Brand as={NavLink} exact to="/" className="navbar-brand-centered">
          <img src={logo} alt="ReciclApp Brasil Logo" height="120" className="d-inline-block align-top logo" />
        </Navbar.Brand>

        <Nav className="justify-content-start">
          <Nav.Link as={NavLink} to="/" className="nav-link">
            <FiHome className="icon" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/anuncios" className="nav-link">
            <FaRecycle className="icon" />
          </Nav.Link>
        </Nav>

        <div className="ml-auto">
          {!isLoggedIn && (
            <Button as={NavLink} to={getProfileUrl()} variant="success" style={{ marginRight: '10px' }}>
              <FiUser /> Cadastro
            </Button>
          )}
          {isLoggedIn ? (
            <>
              <Button as={NavLink} to="/cadastroproduto" variant="success" style={{ marginRight: '10px' }}>
                <FiUser /> Cadastro de Anúncios
              </Button>
              {renderMeusAnunciosButton()}
            </>
          ) : (
            <Button as={NavLink} to="/login" variant="outline-primary">
              <FiLogIn /> Entrar
            </Button>
          )}
          {isLoggedIn && (
            <Button variant="outline-primary" onClick={handleLogout}>
              <FiLogOut /> Sair
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Navegacao;