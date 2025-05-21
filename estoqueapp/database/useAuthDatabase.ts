import { useSQLiteContext } from 'expo-sqlite';

export type AuthUser = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export function useAuthDatabase() {
  const database = useSQLiteContext();

  async function createUser(username: string, password: string, isAdmin: boolean = false): Promise<void> {
    const statement = await database.prepareAsync(
      `INSERT INTO users (username, password, isAdmin) VALUES ($username, $password, $isAdmin)`
    );
    await statement.executeAsync({
      $username: username,
      $password: password,
      $isAdmin: isAdmin ? 1 : 0,
    });
    await statement.finalizeAsync();
  }

  async function validateLogin(username: string, password: string): Promise<AuthUser | null> {
    const result = await database.getFirstAsync(
      `SELECT id, username, isAdmin FROM users WHERE username = ? AND password = ?`,
      [username, password]
    );
    if (!result) return null;
    return {
      id: result.id,
      username: result.username,
      isAdmin: !!result.isAdmin,
    };
  }

  async function getUserById(id: number): Promise<AuthUser | null> {
    const result = await database.getFirstAsync(
      `SELECT id, username, isAdmin FROM users WHERE id = ?`,
      [id]
    );
    if (!result) return null;
    return {
      id: result.id,
      username: result.username,
      isAdmin: !!result.isAdmin,
    };
  }

  return {
    createUser,
    validateLogin,
    getUserById,
  };
}
