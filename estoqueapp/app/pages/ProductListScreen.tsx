import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useProductsDatabase } from '../../database/useProductsDatabase';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  categoryName?: string;
};

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { listWithCategory } = useProductsDatabase();
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const result = await listWithCategory();
      setProducts(result);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('CadastroProduto', { product: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Categoria: {item.categoryName || 'Sem categoria'}</Text>
      <Text style={styles.detail}>Quantidade: {item.quantity}</Text>
      <Text style={styles.detail}>Preço unitário: R$ {item.unitPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#666" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={products.length === 0 && styles.emptyContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
