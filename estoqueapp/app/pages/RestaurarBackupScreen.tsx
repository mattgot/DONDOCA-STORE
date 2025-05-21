import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useSQLiteContext } from "expo-sqlite";

export default function RestaurarBackupScreen() {
  const database = useSQLiteContext();

  async function handleImportBackup() {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "application/json" });
      if (result.canceled || !result.assets?.[0].uri) return;

      const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const data = JSON.parse(content);

      if (!data.produtos || !data.categorias || !data.clientes) {
        Alert.alert("Erro", "Backup inválido ou incompleto.");
        return;
      }

      // ⚠️ Limpa tabelas antes (opcional, cuidado!)
      await database.execAsync("DELETE FROM products");
      await database.execAsync("DELETE FROM categories");
      await database.execAsync("DELETE FROM clients");

      // Restaura categorias
      for (const cat of data.categorias) {
        await database.runAsync("INSERT INTO categories (id, name) VALUES (?, ?)", [cat.id, cat.name]);
      }

      // Restaura clientes
      for (const client of data.clientes) {
        await database.runAsync(
          "INSERT INTO clients (id, name, phone, email, address) VALUES (?, ?, ?, ?, ?)",
          [client.id, client.name, client.phone, client.email, client.address]
        );
      }

      // Restaura produtos
      for (const prod of data.produtos) {
        await database.runAsync(
          "INSERT INTO products (id, name, quantity, unitPrice, categoryId) VALUES (?, ?, ?, ?, ?)",
          [
            prod.id,
            prod.name,
            prod.quantity,
            prod.unitPrice,
            prod.categoryId ?? null,
          ]
        );
      }

      Alert.alert("Sucesso", "Backup restaurado com sucesso!");
    } catch (err) {
      console.error("Erro ao restaurar backup:", err);
      Alert.alert("Erro", "Falha ao restaurar o backup.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurar Backup</Text>
      <TouchableOpacity onPress={handleImportBackup} style={styles.button}>
        <Text style={styles.buttonText}>Selecionar Arquivo .json</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  button: {
    backgroundColor: "#ff69b4",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
