import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import '../pages/Anuncios.css';

const Anuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(1);

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

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    setCurrentPage(Number(page) || 1);
  }, [location]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const chunk = (arr, size) => {
    const chunkedArr = [];
    let index = 0;
    while (index < arr.length) {
      chunkedArr.push(arr.slice(index, index + size));
      index += size;
    }
    return chunkedArr;
  };

  const anunciosPorFileira = chunk(anuncios, 2);
  const displayedAnuncios = anunciosPorFileira.slice(0, currentPage * 5);

  return (
    <Container>
      <h1>Anúncios</h1>
      {displayedAnuncios.map((fileira, index) => (
        <Row key={index}>
          {fileira.map((anuncio) => (
            <Col key={anuncio.id} md={6}>
              <Card className="mb-3">
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
                          <Button variant="primary">Cadastre-se para entrar em contato</Button>
                        </Link>
                      )}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      {displayedAnuncios.length < anunciosPorFileira.length && (
        <Link to={`/anuncios?page=${currentPage + 1}`}>
          <Button className="next-page-button" variant="primary" onClick={nextPage}>
            Próxima página
          </Button>
        </Link>
      )}
    </Container>
  );
};

export default Anuncios;
