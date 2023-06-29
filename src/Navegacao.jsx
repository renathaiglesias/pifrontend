import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FiHome, FiUser, FiLogOut, FiLogIn, FiImage } from 'react-icons/fi';
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
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

        <Nav className="justify-content-sm-center">
          <Nav.Link as={NavLink} to="/" className="nav-link">
            <FiHome className="icon" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/" className="nav-link">
            <FiImage className="icon" />
          </Nav.Link>
          <Nav.Link as={NavLink} to={getProfileUrl()} className="nav-link">
            <FiUser className="icon" />
          </Nav.Link>
        </Nav>
        <div className="ml-auto">
          {isLoggedIn ? (
            <Button variant="outline-primary" onClick={handleLogout}>
              <FiLogOut /> Logout
            </Button>
          ) : (
            <Button as={NavLink} to="/login" variant="outline-primary">
              <FiLogIn /> Login
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Navegacao;
