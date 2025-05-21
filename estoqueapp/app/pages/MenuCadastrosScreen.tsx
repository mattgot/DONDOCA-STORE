import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

type StackParamList = {
  "Cadastrar Produto": undefined;
  "CadastroCategoria": undefined;
  "GerenciarCategorias": undefined;
};

export function MenuCadastrosScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastros</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cadastrar Produto")}
      >
        <MaterialIcons name="add-box" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Cadastrar Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CadastroCategoria")}
      >
        <MaterialIcons name="category" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Nova Categoria</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("GerenciarCategorias")}
      >
        <MaterialIcons name="edit" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Gerenciar Categorias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff69b4",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
