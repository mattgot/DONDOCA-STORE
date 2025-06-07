import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useProductsDatabase } from '../../database/useProductsDatabase';
import { useNavigation } from '@react-navigation/native';
import  styles  from '../styles/styles.js';

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
      style={styles.container}
      onPress={() => navigation.navigate('CadastroProduto', { product: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.label}>Categoria: {item.categoryName || 'Sem categoria'}</Text>
      <Text style={styles.label}>Quantidade: {item.quantity}</Text>
      <Text style={styles.label}>Preço unitário: R$ {item.unitPrice.toFixed(2)}</Text>
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
          contentContainerStyle={products.length === 0 && styles.label}
          ListEmptyComponent={<Text style={styles.label}>Nenhum produto cadastrado.</Text>}
        />
      )}
    </View>
  );
}
