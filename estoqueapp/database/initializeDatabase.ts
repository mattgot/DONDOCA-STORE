type PromisifiedDatabase = {
  execAsync: (sql: string) => Promise<void>;
};

export async function initializeDatabase(database: PromisifiedDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice REAL NOT NULL
    );
  `);
}
