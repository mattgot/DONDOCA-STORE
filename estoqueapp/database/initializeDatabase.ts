type PromisifiedDatabase = {
  execAsync: (sql: string) => Promise<void>;
};

export async function initializeDatabase(database: PromisifiedDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      address TEXT
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice REAL NOT NULL,
      categoryId INTEGER,
      FOREIGN KEY (categoryId) REFERENCES categories(id)
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      isAdmin INTEGER NOT NULL DEFAULT 0
    );
  `);

  await database.execAsync(`
    INSERT INTO users (username, password, isAdmin)
    SELECT 'admin', 'admin', 1
    WHERE NOT EXISTS (
      SELECT 1 FROM users WHERE username = 'admin'
    );
  `);
}
