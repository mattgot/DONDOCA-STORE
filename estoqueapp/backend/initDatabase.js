// by Douglas Lobato

// initDatabase.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo DONDOCA-STORE.db
const dbPath = path.resolve(__dirname, 'DONDOCA-STORE.db');

// Conectar ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Criar a tabela products
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    category TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela products:', err.message);
  } else {
    console.log('Tabela products criada ou já existe.');
  }

  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão:', err.message);
    } else {
      console.log('Conexão com o banco fechada.');
    }
  });
});
