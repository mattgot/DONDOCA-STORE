import { useSQLiteContext } from "expo-sqlite";

type Client = {
  id?: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export function useClientsDatabase() {
  const database = useSQLiteContext();

  async function createClient(data: Client): Promise<void> {
    const statement = await database.prepareAsync(
      "INSERT INTO clients (name, phone, email, address) VALUES ($name, $phone, $email, $address)"
    );

    await statement.executeAsync({
      $name: data.name,
      $phone: data.phone ?? null,
      $email: data.email ?? null,
      $address: data.address ?? null,
    });

    await statement.finalizeAsync();
  }

  async function listClients(): Promise<Client[]> {
    return await database.getAllAsync("SELECT * FROM clients") as Client[];
  }

  return { createClient, listClients };
}
