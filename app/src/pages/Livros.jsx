import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import CardPers from '../Components/Card.jsx';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/livros')
      .then(response => response.json())
      .then(data => {
        const LivrosFormatados = data.map(livro => ({
          id: livro.id_livro,
          nome: livro.nome_livro,
          descricao: livro.descricao_livro,
          autor: livro.autor_livro,
          imagem: livro.img_link
        }));
        setLivros(LivrosFormatados);
      })
      .catch(error => {
        console.error('Erro ao buscar livros:', error);
      });
  }, []);

  return (
    <div>
      <NavBar />

      <Button className='mt-4 d-flex justift-content-end' onClick={() => navigate('/Cadastro')}>Cadastrar livro</Button>

      {livros.map((livro) => (
        <CardPers
          key={livro.id}
          img={livro.imagem}
          titulo={livro.nome}
          desc={livro.descricao}
          but={
            <>
              <Button className='mt-4 d-flex justift-content-end' variant='success' onClick={() => navigate(`/editar/${livro.id}`)}>editar livro</Button>
              <Button className='mt-4 d-flex justift-content-end' variant='danger' onClick={() => navigate(`/excluir/${livro.id}`)}>Excluir livro</Button>
            </>
          }

        />
      ))}
    </div>
  );
};

export default Livros;
