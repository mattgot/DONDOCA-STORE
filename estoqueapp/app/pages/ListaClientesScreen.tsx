import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useClientsDatabase } from "@db/useClientsDatabase";

export default function ListaClientesScreen() {
  const { listClients } = useClientsDatabase();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetch() {
      const dados = await listClients();
      setClientes(dados);
    }

    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes Cadastrados</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.email}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "bold" },
});
