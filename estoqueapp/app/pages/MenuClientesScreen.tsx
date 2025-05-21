import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

// Tipagem das rotas válidas
type StackParamList = {
  CadastroCliente: undefined;
  ListaClientes: undefined;
};

export default function MenuClientesScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CadastroCliente")}
      >
        <MaterialIcons name="person-add" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Cadastrar Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ListaClientes")}
      >
        <MaterialIcons name="groups" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Listar Clientes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff69b4',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: { marginRight: 8 },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
