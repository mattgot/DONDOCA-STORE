// Douglas Lobato

import { useSQLiteContext } from "expo-sqlite";

// Tipo base para produtos
type Product = {
  id?: number;
  name: string;
  quantity: number;
};

// Tipo de retorno para criação
type ProductResult = {
  insertedRowId: string;
};

export function useProductsDatabase() {
  const database = useSQLiteContext();

  // Criar produto
  async function create(data: Product): Promise<ProductResult> {
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

  // Buscar produtos por nome
  async function searchByName(name: string): Promise<Product[]> {
    try {
      const query = "SELECT * FROM products WHERE name LIKE ?";
      const response = await database.getAllAsync(query, [`%${name}%`]);
      return response as Product[];
    } catch (error) {
      throw error;
    }
  }

  // Atualizar produto completo (nome e quantidade)
  async function update(data: Product): Promise<void> {
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

  // Atualizar apenas a quantidade
  async function updateQuantity(id: number, quantity: number): Promise<void> {
    const statement = await database.prepareAsync(
      "UPDATE products SET quantity = $quantity WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
        $quantity: quantity,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // Atualizar apenas o nome
  async function updateName(id: number, name: string): Promise<void> {
    const statement = await database.prepareAsync(
      "UPDATE products SET name = $name WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
        $name: name,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // Deletar produto
  async function remove(id: number): Promise<void> {
    try {
      await database.execAsync("DELETE FROM products WHERE id = ?", [id]);
    } catch (error) {
      throw error;
    }
  }

  // Buscar produto por ID
  async function show(id: number): Promise<Product | undefined> {
    try {
      const query = "SELECT * FROM products WHERE id = ?";
      const response = await database.getFirstAsync(query, [id]);
      return response as Product;
    } catch (error) {
      throw error;
    }
  }

  return {
    create,
    searchByName,
    update,
    updateQuantity,
    updateName,
    remove,
    show,
  };
}
