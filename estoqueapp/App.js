import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';
import styles from './styles/styles';

// Dados simulados
const produtos = [
  { id: '1', nome: 'Cadeira de Escritório' },
  { id: '2', nome: 'Mesa de Madeira' },
  { id: '3', nome: 'Armário de Aço' },
  { id: '4', nome: 'Estante Pequena' },
  { id: '5', nome: 'Sofá 2 Lugares' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos em estoque</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.linha}>
            <Text style={styles.produto}>{item.nome}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

