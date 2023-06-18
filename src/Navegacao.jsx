import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import logo from './images/logo.png';
import './Navegacao.css';

function Navegacao () {
  return (
    <Navbar className="custom-navbar navbar" expand="lg" variant="">
      <Container>
        <Navbar.Brand as={NavLink} exact to="/">
          <img
            src={logo}
            alt="ReciclApp Brasil Logo"
            height="50"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link">
              Início
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cadastro" className="nav-link">
              Cadastro
            </Nav.Link>
            <Button
              as={NavLink}
              to="/login"
              variant="outline-primary">
              Login
            </Button> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacao;
