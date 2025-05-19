// Douglas Lobato

import { useSQLiteContext } from "expo-sqlite";

type Product = {
  id?: number;
  name: string;
  quantity: number;
  unitPrice: number;
};

type ProductResult = {
  insertedRowId: string;
};

export function useProductsDatabase() {
  const database = useSQLiteContext();

  // Criar produto
  async function create(data: Product): Promise<ProductResult> {
    const statement = await database.prepareAsync(
      "INSERT INTO products (name, quantity, unitPrice) VALUES ($name, $quantity, $unitPrice)"
    );

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $quantity: data.quantity,
        $unitPrice: data.unitPrice,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();
      console.log("Produto criado com ID:", insertedRowId);
      return { insertedRowId };
    } catch (error) {
      console.error("Erro ao criar produto:", error);
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
      console.log("Produtos encontrados:", response.length);
      return response as Product[];
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }

  // Atualizar produto completo
  async function update(data: Product): Promise<void> {
    if (!data.id) throw new Error("ID do produto inválido para atualização.");

    const statement = await database.prepareAsync(
      "UPDATE products SET name = $name, quantity = $quantity, unitPrice = $unitPrice WHERE id = $id"
    );

    try {
      console.log("Atualizando produto:", data);
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
        $unitPrice: data.unitPrice,
      });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
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
      await statement.executeAsync({ $id: id, $quantity: quantity });
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
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
      await statement.executeAsync({ $id: id, $name: name });
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // Deletar produto
  async function remove(id: number): Promise<void> {
    const statement = await database.prepareAsync(
      "DELETE FROM products WHERE id = $id"
    );

    try {
      const result = await statement.executeAsync({ $id: id });
      if ((result as any)?.rowsAffected === 0) {
        throw new Error(`Nenhum produto encontrado com o ID ${id}.`);
      }
      console.log(`Produto com ID ${id} removido.`);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      throw new Error("Erro ao remover o produto do banco de dados.");
    } finally {
      await statement.finalizeAsync();
    }
  }

  // Buscar produto por ID
  async function show(id: number): Promise<Product | undefined> {
    if (!id) throw new Error("ID inválido para consulta.");

    try {
      const query = "SELECT * FROM products WHERE id = ?";
      const response = await database.getFirstAsync(query, [id]);
      console.log("Produto encontrado por ID:", response);
      return response as Product;
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      throw error;
    }
  }

  // Total em estoque (soma de quantity * unitPrice)
  async function getTotalStockValue(): Promise<number> {
    try {
      const result = await database.getFirstAsync(
        "SELECT SUM(quantity * unitPrice) AS total FROM products"
      );
      const total = result?.total ?? 0;
      console.log("Valor total do estoque:", total);
      return total;
    } catch (error) {
      console.error("Erro ao calcular total em estoque:", error);
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
    getTotalStockValue,
  };
}
