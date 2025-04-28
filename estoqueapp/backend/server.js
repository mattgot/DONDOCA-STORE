// by Douglas Lobato (estoy loco)

// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database.js');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas

// Buscar todos os produtos
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Buscar um produto por ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar produto:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Adicionar um novo produto
app.post('/products', (req, res) => {
  const { name, price, quantity, category } = req.body;
  const query = `
    INSERT INTO products (name, price, quantity, category)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [name, price, quantity, category], function (err) {
    if (err) {
      console.error('Erro ao adicionar produto:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Atualizar um produto existente
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;
  const query = `
    UPDATE products
    SET name = ?, price = ?, quantity = ?, category = ?
    WHERE id = ?
  `;
  db.run(query, [name, price, quantity, category, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar produto:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ updated: this.changes });
    }
  });
});

// Deletar um produto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao deletar produto:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
