import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());


// ROTAS DO USUÁRIO
app.post('/usuario', (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    connection.query(query, [email, senha], (error, results) => {
        if (error) {
            console.log("Erro ao buscar usuário", error);
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
        if (results.length > 0) {
            res.json({ success: true, usuario: results[0] });

        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    });
}
)







// ROTAS DO LIVRO
app.get('/livros', (req, res) => {
    const query = 'SELECT * FROM livros';
    connection.query(query, (error, results) => {
        if (error) {
            console.log("Erro ao buscar livros", error);
            return res.status(500).json({ error: 'Erro ao buscar livros' });
        }
        res.json(results);
    });
})




app.post('/livros', (req, res) => {
    const { nome, descricao, capa } = req.body;

    if (!nome || !descricao || !capa) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const query = 'INSERT INTO livros (nome_livro, descricao_livro, img_link, preco) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, descricao, capa, 0.0], (error, results) => {
        if (error) {
            console.log("Erro ao cadastrar livro", error);
            return res.status(500).json({ error: 'Erro ao cadastrar livro' });
        }
        res.json({ success: true, id: results.insertId });
    });
});




app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, capa } = req.body;
    const query = 'UPDATE livros SET nome_livro = ?, descricao_livro = ?, img_link = ? WHERE id_livro = ?';
    connection.query(query, [nome, descricao, capa, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar livro' });
        res.json({ success: true });
    });
});




app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM livros WHERE id_livro = ?';
    connection.query(query, [id], (error, results) => {
        if (error) {
            console.log("Erro ao buscar livro", error);
            return res.status(500).json({ error: 'Erro ao buscar livro' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    });
})




app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM livros WHERE id_livro = ?';
    connection.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao excluir livro' });
        res.json({ success: true });
    });
});





// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;