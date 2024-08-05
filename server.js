const express = require('express');
const path = require('path');
const pool = require('./database.js');
const { log, error } = require('console');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/test-connection', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        await conn.query("SELECT 1");
        conn.release();
        res.send("Conexão bem-sucedida!");
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        res.status(500).send("Erro ao conectar ao banco de dados");
    }
});

app.get('/api/destinos', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM destinos");
        conn.release();
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: ' Erro ao recuperar destinos'});
    }
});

// Rota para obter atrativos de um destino específico
app.get('/api/destinos/:id/atrativos', async (req, res) => {
    const destinoId = req.params.id;
    try {
        const conn = await pool.getConnection();
        const results = await conn.query('SELECT * FROM atrativos WHERE destinos_id = ?', [destinoId]);
        conn.release();
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar atrativos:', error);
        res.status(500).send('Erro ao buscar atrativos.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
