import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Container, Form } from 'react-bootstrap'
import Navbar from '../Components/NavBar'

const Excluir = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch(`http://localhost:3000/livros/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert('Livro excluído com sucesso!');
          navigate('/livros');
        } else {
          alert('Erro ao excluir livro.');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir livro:', error);
        alert('Erro na exclusão.');
      });
  };

  return (
    <div>
      <Navbar />
      <Container>
        <h1 className='mt-4'>Excluir Livro</h1>
        <Form className='mt-4'>
          <Form.Group className="mb-3">
            <Form.Label>Você tem certeza que deseja excluir o livro?</Form.Label>
          </Form.Group>
          <Button variant="danger" type="button" onClick={handleSubmit}>
            Excluir Livro
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Excluir;
