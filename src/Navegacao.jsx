import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './Navegacao.css';
import {auth} from './firebaseConfig'



function Navegacao() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Navbar className="custom-navbar navbar" expand="lg" variant="">
      <Container>
        <Navbar.Brand as={NavLink} exact to="/">
          <img
            src={logo}
            alt="ReciclApp Brasil Logo"
            height="65"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link">
              Início
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={NavLink} to="/cadastro" className="nav-link">
                Cadastro
              </Nav.Link>
            )}
            {isLoggedIn ? (
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button as={NavLink} to="/login" variant="outline-primary">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacao;
