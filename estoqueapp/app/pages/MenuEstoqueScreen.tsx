import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

type StackParamList = {
  "Relatórios": undefined;
  "RestaurarBackup": undefined;
};

export function MenuEstoqueScreen() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Relatórios")}
      >
        <MaterialIcons name="insights" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RestaurarBackup")}
      >
        <MaterialIcons name="restore" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.text}>Restaurar Backup</Text>
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
