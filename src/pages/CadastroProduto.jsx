import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, firestore } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

import './CadastroProduto.css';

const Categorias = ['Papel e papelão', 'Plástico', 'Vidro', 'Metal (alumínio, aço)'];

const CadastroProduto = () => {
  const navigate = useNavigate();
  const [imagem, setImagem] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleImagemUpload = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos foram preenchidos
    if (!imagem || !titulo || !descricao || !categoria) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      // Upload da imagem para o Firebase Storage
      const storageRef = ref(storage, `imagens/${imagem.name}`);
      await uploadBytes(storageRef, imagem);

      // Obter a URL da imagem
      const imageUrl = await getDownloadURL(storageRef);

      // Obter o userId do usuário logado
      const user = auth.currentUser;
      const userId = user.uid;

      // Salvar o produto no Firestore com o userId associado
      const produtoData = {
        userId, // Associar o userId do usuário ao produto
        imagem: imageUrl,
        titulo,
        descricao,
        categoria,
      };
      await addDoc(collection(firestore, 'produtos'), produtoData);

      // Exibir alerta de sucesso
      alert('Anúncio cadastrado com sucesso');

      // Redirecionar para a página de sucesso
      navigate('/anuncios');
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
    }
  };

  return (
    <Container className="informacoes-adicionais-container ">
      <h1 className="informacoes-adicionais-title">Cadastro de Anúncio</h1>
      <Form className="informacoes-adicionais-form" onSubmit={handleSubmit}>
        <Form.Group controlId="imagem">
          <Form.Label className="informacoes-adicionais-label">Imagem</Form.Label>
          <Form.Control
            className="informacoes-adicionais-input"
            type="file"
            accept="image/*"
            onChange={handleImagemUpload}
          />
        </Form.Group>
        <Form.Group controlId="titulo">
          <Form.Label className="informacoes-adicionais-label">Título do Anúncio</Form.Label>
          <Form.Control
            className="informacoes-adicionais-input"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="descricao">
          <Form.Label className="informacoes-adicionais-label">Descrição</Form.Label>
          <Form.Control
            className="informacoes-adicionais-input textarea-control"
            as="textarea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="categoria">
          <Form.Label className="informacoes-adicionais-label">Categoria</Form.Label>
          <Form.Control
            className="informacoes-adicionais-select"
            as="select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione a categoria</option>
            {Categorias.map((cat, index) => (
              <option className="informacoes-adicionais-option" key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="informacoes-adicionais-button" variant="primary" type="submit">
          Cadastrar Anúncio
        </Button>
      </Form>
    </Container>
  );
};

export default CadastroProduto;
