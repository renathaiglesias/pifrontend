import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Col, Form } from 'react-bootstrap';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../pages/MeusAnuncios.css";


const MeusAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [user] = useAuthState(auth);
  const [editingAnuncio, setEditingAnuncio] = useState(null);
  const [tituloEditado, setTituloEditado] = useState('');
  const [descricaoEditada, setDescricaoEditada] = useState('');
  const [categoriaEditada, setCategoriaEditada] = useState('');
  const [imagemEditada, setImagemEditada] = useState(null);
  const [novaFoto, setNovaFoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        // Usuário não autenticado, não há anúncios para exibir
        return;
      }

      const q = query(collection(firestore, 'produtos'), where('userId', '==', user.uid));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAnuncios(data);
        console.log('Dados obtidos:', data);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'produtos', id));
    } catch (error) {
      console.error('Erro ao excluir o anúncio:', error);
    }
  };

  const handleEdit = (anuncio) => {
    setEditingAnuncio(anuncio);
    setTituloEditado(anuncio.titulo);
    setDescricaoEditada(anuncio.descricao);
    setCategoriaEditada(anuncio.categoria);
    setImagemEditada(null);
    setNovaFoto(null);
  };

  const handleCancelEdit = () => {
    setEditingAnuncio(null);
    setTituloEditado('');
    setDescricaoEditada('');
    setCategoriaEditada('');
    setImagemEditada(null);
    setNovaFoto(null);
  };

  const handleSaveEdit = async () => {
    try {
      const anuncioRef = doc(firestore, 'produtos', editingAnuncio.id);

      const updateData = {
        titulo: tituloEditado,
        descricao: descricaoEditada,
        categoria: categoriaEditada,
      };

      if (novaFoto) {
        const novaFotoUrl = await uploadImageAndGetURL(novaFoto);
        updateData.imagem = novaFotoUrl;
      }

      await updateDoc(anuncioRef, updateData);

      setAnuncios((anuncios) =>
        anuncios.map((anuncio) =>
          anuncio.id === editingAnuncio.id ? { ...anuncio, ...updateData } : anuncio
        )
      );

      setEditingAnuncio(null);
      setTituloEditado('');
      setDescricaoEditada('');
      setCategoriaEditada('');
      setImagemEditada(null);
      setNovaFoto(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const uploadImageAndGetURL = async (file) => {
    try {
      // Crie uma referência para o local do armazenamento onde a imagem será armazenada
      const storageRef = ref(storage);
      const imageRef = ref(storageRef, `imagens/${file.name}`);

      // Faça o upload da imagem para o armazenamento
      await uploadBytes(imageRef, file);

      // Obtenha a URL da imagem
      const imageUrl = await getDownloadURL(imageRef);

      return imageUrl;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  return (
    <Container className="container">
      <h2 className="h2">Meus Anúncios</h2>
      {anuncios.map((anuncio) => (
        <Card key={anuncio.id} className="card">
          <Card.Img
            variant="top"
            src={
              novaFoto
                ? URL.createObjectURL(novaFoto)
                : imagemEditada
                ? URL.createObjectURL(imagemEditada)
                : anuncio.imagem
            }
            className="card-img-top1"
          />
          <Card.Body className="card-body">
            {editingAnuncio === anuncio ? (
              <>
                <Form.Group className="form-group mb-3">
                  <Form.Control type="text" value={tituloEditado} onChange={(e) => setTituloEditado(e.target.value)} className="form-control" />
                </Form.Group>
                <Form.Group className="form-group mb-3">
                  <Form.Control as="textarea" rows={3} value={descricaoEditada} onChange={(e) => setDescricaoEditada(e.target.value)} className="form-control" />
                </Form.Group>
                <Form.Group className="form-group mb-3">
                  <Form.Control type="text" value={categoriaEditada} onChange={(e) => setCategoriaEditada(e.target.value)} className="form-control" />
                </Form.Group>
                <Form.Group className="form-group mb-3">
                  <Form.Control type="file" onChange={(e) => setNovaFoto(e.target.files[0])} className="form-control" />
                </Form.Group>
                <Button variant="primary" onClick={handleSaveEdit} className="btn-primary">
                  Salvar
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit} className="btn-secondary">
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Card.Title className="card-title">{anuncio.titulo}</Card.Title>
                <Card.Text className="card-text">{anuncio.descricao}</Card.Text>
                <Card.Text className="card-text">{anuncio.categoria}</Card.Text>
                <Button variant="primary" onClick={() => handleEdit(anuncio)} className="btn-primary">
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(anuncio.id)} className="btn-danger">
                  Excluir
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default MeusAnuncios;
