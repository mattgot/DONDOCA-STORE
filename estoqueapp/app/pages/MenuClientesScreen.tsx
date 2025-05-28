import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import  styles  from '../styles/styles';

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
