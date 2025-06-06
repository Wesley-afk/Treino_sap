import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Navigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Login realizado com sucesso!');
                setRedirect(true);
                return;
            } else {
                alert('Credenciais inválidas.');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            alert('Erro no login');
        }
    }

    if(redirect){
        return <Navigate to="/livros"/>
    }

        return (
            <div>
                <NavBar />
                <Container className>
                    <h3>Login</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Digite seu e-mail" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-4">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Digite sua senha" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Entrar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        )
    }

    export default Login