import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useCategoriesDatabase } from "@db/useCategoriesDatabase";

export default function CadastroCategoriaScreen() {
  const { createCategory } = useCategoriesDatabase();
  const [name, setName] = useState("");

  async function handleSalvar() {
    if (!name.trim()) {
      Alert.alert("Erro", "O nome da categoria é obrigatório.");
      return;
    }

    try {
      await createCategory(name);
      Alert.alert("Sucesso", "Categoria cadastrada!");
      setName("");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      Alert.alert("Erro", "Não foi possível salvar a categoria.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Categoria</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Button title="Salvar Categoria" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 12, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
  },
});
