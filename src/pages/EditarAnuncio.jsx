import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../firebaseConfig';

const EditarAnuncio = ({ anuncio, onCancel, onSave }) => {
  const [editedFields, setEditedFields] = useState({
    imagem: '',
    titulo: anuncio.titulo,
    descricao: anuncio.descricao,
    categoria: anuncio.categoria,
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `imagens/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setEditedFields((prevFields) => ({
        ...prevFields,
        imagem: imageUrl,
      }));
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, ...updatedFields } = editedFields;
      if (id && Object.keys(updatedFields).length > 0) {
        await updateDoc(doc(firestore, 'produtos', id), updatedFields);
        history.push('/anuncios'); // Redireciona para a página de anúncios após o salvamento
      }
    } catch (error) {
      console.error('Erro ao atualizar o anúncio:', error);
    }
  };

  return (
    <div>
      <h2>Editar Anúncio</h2>
      <Form>
        <Form.Group controlId="formImagem">
          <Form.Label>Imagem</Form.Label>
          <br />
          <img src={editedFields.imagem || anuncio.imagem} alt="Imagem do Anúncio" />
          <br />
          <Form.Control type="file" name="imagem" onChange={handleImageUpload} />
        </Form.Group>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" name="titulo" value={editedFields.titulo} onChange={handleFieldChange} />
        </Form.Group>
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descricao"
            value={editedFields.descricao}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="formCategoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            name="categoria"
            value={editedFields.categoria}
            onChange={handleFieldChange}
          >
            <option value="">Selecione a categoria</option>
            <option value="Papel e papelão">Papel e papelão</option>
            <option value="Plástico">Plástico</option>
            <option value="Vidro">Vidro</option>
            <option value="Metal (alumínio, aço)">Metal (alumínio, aço)</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate}>
          Salvar
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default EditarAnuncio;
