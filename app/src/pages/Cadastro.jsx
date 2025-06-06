import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [capa, setCapa] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao, capa }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Livro cadastrado com sucesso!');
                setRedirect(true);
                return;
            } else {
                alert('Erro ao cadastrar livro.');
                navigate('/livros');
            }
        } catch (error) {
            console.error('Erro ao tentar cadastrar livro:', error);
            alert('Erro no cadastro');
        }
    }


    return (
        <div>
            <Container>
                <NavBar />

                <h3>Cadastro de livro</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do livro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do livro"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Descrição do livro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição do livro"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Capa do livro</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder="Digite o endereço da capa do livro"
                            value={capa}
                            onChange={(e) => setCapa(e.target.value)}
                        />
                    </Form.Group>

                    <div className='d-grid'>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Cadastro