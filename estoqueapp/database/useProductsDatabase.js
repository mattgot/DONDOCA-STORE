// ./database/useProductDatabase.js

import { useSQLiteContext } from "expo-sqlite";

export function useProductDatabase() {
  const database = useSQLiteContext();

  async function create(data) {
    const statement = await database.prepareAsync(
      "INSERT INTO products (name, quantity) VALUES ($name, $quantity)"
    );

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $quantity: data.quantity,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByName(name) {
    try {
      const query = "SELECT * FROM products WHERE name LIKE ?";
      const response = await database.getAllAsync(
        query,
        `%${name}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data) {
    const statement = await database.prepareAsync(
      "UPDATE products SET name = $name, quantity = $quantity WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id) {
    try {
      await database.execAsync("DELETE FROM products WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id) {
    try {
      const query = "SELECT * FROM products WHERE id = ?";
      const response = await database.getFirstAsync(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByName, update, remove, show };
}
