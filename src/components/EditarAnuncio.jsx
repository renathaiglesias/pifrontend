import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditarAnuncio = ({ anuncio, onCancel, onSave }) => {
  const [titulo, setTitulo] = useState(anuncio.titulo);
  const [descricao, setDescricao] = useState(anuncio.descricao);
  const [categoria, setCategoria] = useState(anuncio.categoria);

  const handleSave = (e) => {
    e.preventDefault();

    const anuncioEditado = {
      titulo,
      descricao,
      categoria,
    };

    onSave(anuncioEditado);
  };

  return (
    <Form onSubmit={handleSave}>
      <Form.Group controlId="titulo">
        <Form.Label>Título do Anúncio</Form.Label>
        <Form.Control
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="descricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="categoria">
        <Form.Label>Categoria</Form.Label>
        <Form.Control
          as="select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option value="Papel e papelão">Papel e papelão</option>
          <option value="Plástico">Plástico</option>
          <option value="Vidro">Vidro</option>
          <option value="Metal (alumínio, aço)">Metal (alumínio, aço)</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar Alterações
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancelar
      </Button>
    </Form>
  );
};

export default EditarAnuncio;
