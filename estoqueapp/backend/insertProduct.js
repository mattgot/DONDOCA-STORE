// by Douglas Lobato

// insertProduct.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o banco DONDOCA-STORE.db
const dbPath = path.resolve(__dirname, 'DONDOCA-STORE.db');

// Conectar ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Produto de teste
const insertQuery = `
  INSERT INTO products (name, price, quantity, category)
  VALUES (?, ?, ?, ?)
`;

// Dados do produto
const values = ['Tênis Esportivo', 199.90, 10, 'Calçados'];

// Inserir no banco
db.run(insertQuery, values, function (err) {
  if (err) {
    console.error('Erro ao inserir produto:', err.message);
  } else {
    console.log(`Produto inserido com sucesso! ID: ${this.lastID}`);
  }

  // Fechar o banco
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão:', err.message);
    } else {
      console.log('Conexão com o banco fechada.');
    }
  });
});
