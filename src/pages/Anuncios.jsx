import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import '../pages/Anuncios.css'; // Importe o arquivo CSS criado

const Anuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(firestore, 'produtos'), orderBy('titulo'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAnuncios(data);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1>Anúncios</h1>
      {anuncios.map((anuncio) => (
        <Card key={anuncio.id} className="mb-3">
          <Row>
            <Col md={4}>
              <Card.Img variant="top" src={anuncio.imagem} />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{anuncio.titulo}</Card.Title>
                <Card.Text>{anuncio.descricao}</Card.Text>
                <Card.Text>Categoria: {anuncio.categoria}</Card.Text>
                {user ? (
                  <Button variant="primary">Entrar em contato</Button>
                ) : (
                  <Link to="/cadastro">
                    <Button variant="primary">Cadastre-se para mais informações</Button>
                  </Link>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default Anuncios;
