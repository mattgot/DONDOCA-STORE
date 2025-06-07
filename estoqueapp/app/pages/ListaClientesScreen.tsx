import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useClientsDatabase } from "@db/useClientsDatabase";
import  styles  from '../styles/styles.js';

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
