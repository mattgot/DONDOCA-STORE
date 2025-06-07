import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useCategoriesDatabase } from "@db/useCategoriesDatabase";
import  styles  from '../styles/styles.js';

export default function ConfigCategoriasScreen() {
  const {
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesDatabase();

  const [categorias, setCategorias] = useState([]);
  const [nomeNova, setNomeNova] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    const lista = await listCategories();
    setCategorias(lista);
  }

  async function handleCriarCategoria() {
    if (!nomeNova.trim()) {
      Alert.alert("Erro", "Informe o nome da categoria.");
      return;
    }

    try {
      await createCategory(nomeNova.trim());
      setNomeNova("");
      carregarCategorias();
    } catch (error) {
      Alert.alert("Erro ao criar categoria.");
      console.error(error);
    }
  }

  async function handleSalvarEdicao() {
    if (!nomeEditado.trim() || editandoId === null) return;

    try {
      await updateCategory(editandoId, nomeEditado.trim());
      setEditandoId(null);
      setNomeEditado("");
      carregarCategorias();
    } catch (error) {
      Alert.alert("Erro ao atualizar.");
      console.error(error);
    }
  }

  async function handleExcluir(id: number) {
    Alert.alert("Excluir", "Tem certeza que deseja remover esta categoria?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteCategory(id);
            carregarCategorias();
          } catch (error) {
            Alert.alert("Erro ao excluir.");
            console.error(error);
          }
        },
      },
    ]);
  }

  async function handleCriarCategoriaTeste() {
    try {
      await createCategory("Categoria Teste");
      carregarCategorias();
    } catch (error) {
      Alert.alert("Erro ao criar categoria teste.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nova categoria"
          value={nomeNova}
          onChangeText={setNomeNova}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleCriarCategoria} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style ={styles.text}>
            {editandoId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={nomeEditado}
                  onChangeText={setNomeEditado}
                  autoFocus
                />
                <TouchableOpacity onPress={handleSalvarEdicao} style={styles.button}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditandoId(item.id);
                      setNomeEditado(item.name);
                    }}
                    style={styles.editBtn}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleExcluir(item.id)}
                    style={styles.deleteBtn}
                  >
                    <Text style={styles.deleteText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      <TouchableOpacity onPress={handleCriarCategoriaTeste} style={styles.button}>
        <Text style={{ color: "#666" }}>Criar categoria teste</Text>
      </TouchableOpacity>
    </View>
  );
}
