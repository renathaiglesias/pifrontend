import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { collection, getDocs, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore, storage } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../pages/Anuncios.css';
import EditarAnuncio from './EditarAnuncio';

const Anuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [user] = useAuthState(auth);
  const [editingAnuncio, setEditingAnuncio] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'produtos', id));
    } catch (error) {
      console.error('Erro ao excluir o anúncio:', error);
    }
  };

  const handleEdit = (anuncio) => {
    setEditingAnuncio(anuncio);
  };

  const handleCancelEdit = () => {
    setEditingAnuncio(null);
  };

  const handleSaveEdit = () => {
    setEditingAnuncio(null);
  };

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
                {editingAnuncio === anuncio ? (
                  <EditarAnuncio anuncio={anuncio} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
                ) : (
                  <>
                    <Card.Title>{anuncio.titulo}</Card.Title>
                    <Card.Text>{anuncio.descricao}</Card.Text>
                    <Card.Text>Categoria: {anuncio.categoria}</Card.Text>
                    {user ? (
                      <>
                        <Button variant="primary">Entrar em contato</Button>
                        <Button variant="danger" onClick={() => handleDelete(anuncio.id)}>
                          Excluir
                        </Button>
                        <Button variant="secondary" onClick={() => handleEdit(anuncio)}>
                          Editar
                        </Button>
                      </>
                    ) : (
                      <Link to="/cadastro">
                        <Button variant="primary">Cadastre-se para entrar em contato</Button>
                      </Link>
                    )}
                  </>
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
