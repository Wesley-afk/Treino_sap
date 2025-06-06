import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capa, setCapa] = useState('');

  // Carrega dados do livro ao abrir a página
  useEffect(() => {
    fetch(`http://localhost:3000/livros/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setNome(data.nome_livro);
          setDescricao(data.descricao_livro);
          setCapa(data.img_link);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar livro:', error);
        alert('Erro ao buscar dados do livro.');
      });
  }, [id]);

  // Atualiza livro ao clicar no botão
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/livros/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, descricao, capa }),
      });

      if (response.ok) {
        alert('Livro atualizado com sucesso!');
        navigate('/livros');
      } else {
        alert('Erro ao atualizar livro.');
      }
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      alert('Erro na atualização.');
    }
  };

  return (
    <div>
      <NavBar />
      <Container className='mt-4'>
        <h3>Editar livro</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do livro:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Altere o nome do livro"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Descrição do livro:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Altere a descrição do livro"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Capa do livro:</Form.Label>
            <Form.Control
              type="url"
              placeholder="Altere o endereço da capa do livro"
              value={capa}
              onChange={(e) => setCapa(e.target.value)}
            />
          </Form.Group>

          {capa && (
            <Form.Group className="mb-4">
              <p>Visualize a imagem:</p>
              <img src={capa} alt="Capa do livro" style={{ width: '200px', height: 'auto' }} />
            </Form.Group>
          )}

          <div className='d-grid'>
            <Button variant="primary" type="submit">
              Editar
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Editar;
