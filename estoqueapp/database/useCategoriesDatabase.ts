import { useSQLiteContext } from "expo-sqlite";

type Category = {
  id?: number;
  name: string;
};

export function useCategoriesDatabase() {
  const database = useSQLiteContext();

  async function createCategory(name: string): Promise<void> {
    const statement = await database.prepareAsync(
      "INSERT INTO categories (name) VALUES ($name)"
    );
    try {
      await statement.executeAsync({ $name: name });
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function listCategories(): Promise<Category[]> {
    try {
      const result = await database.getAllAsync("SELECT * FROM categories");
      return result as Category[];
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      return [];
    }
  }

  async function updateCategory(id: number, name: string): Promise<void> {
    const statement = await database.prepareAsync(
      "UPDATE categories SET name = $name WHERE id = $id"
    );
    try {
      await statement.executeAsync({ $id: id, $name: name });
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function deleteCategory(id: number): Promise<void> {
    const statement = await database.prepareAsync(
      "DELETE FROM categories WHERE id = $id"
    );
    try {
      await statement.executeAsync({ $id: id });
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return {
    createCategory,
    listCategories,
    updateCategory,
    deleteCategory,
  };
}
