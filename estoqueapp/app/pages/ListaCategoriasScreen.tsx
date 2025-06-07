import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useCategoriesDatabase } from "@db/useCategoriesDatabase";
import  styles  from '../styles/styles.js';

export default function ListaCategoriasScreen() {
  const { listCategories } = useCategoriesDatabase();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetch() {
      const dados = await listCategories();
      setCategorias(dados);
    }

    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias Cadastradas</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
