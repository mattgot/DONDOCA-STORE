import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from "@react-navigation/native";
import { useProductsDatabase } from "@db/useProductsDatabase";
import { useCategoriesDatabase } from "@db/useCategoriesDatabase";
import { Input } from "@components/Input";
import { Product } from "@components/Product";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import  styles  from '../styles/styles';

// Tipagens
type ProductType = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  categoryId?: number;
};

type CategoryType = {
  id: number;
  name: string;
};

type RootStackParamList = {
  "Estoque Dondoca": undefined;
  CadastroProduto: { product?: ProductType };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Estoque Dondoca">;
};

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [username, setUsername] = useState<string>("");
  const [logoUri, setLogoUri] = useState<string | null>(null);

  const productDatabase = useProductsDatabase();
  const { listCategories } = useCategoriesDatabase();

  async function list() {
    const response = await productDatabase.searchByName(search);
    setProducts(response);
    notifyLowStock(response);
  }

  async function loadSettings() {
    const name = await AsyncStorage.getItem("username");
    const logo = await AsyncStorage.getItem("logo");
    if (name) setUsername(name);
    if (logo) setLogoUri(logo);

    const catList = await listCategories();
    setCategories(catList);
  }

  async function notifyLowStock(products: ProductType[]) {
    const hasLowStock = products.some(p => p.quantity < 5);
    const enabled = await AsyncStorage.getItem("notifications");
    if (hasLowStock && enabled === 'true') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Atenção!",
          body: "Existem produtos com estoque baixo.",
        },
        trigger: null,
      });
    }
  }

  async function handleDelete(productId: number) {
    Alert.alert(
      "Remover Produto",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            await productDatabase.remove(productId);
            await list();
          },
        },
      ]
    );
  }

  function handleOpenEdit(product: ProductType) {
    navigation.navigate("CadastroProduto", { product });
  }

  function getCategoryName(categoryId?: number) {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Sem categoria";
  }

  useFocusEffect(
    useCallback(() => {
      const loadAll = async () => {
        await loadSettings();
        await list();
      };
      loadAll();
    }, [search])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.greeting}>Olá{username ? ", " + username : ""}!</Text>
        {logoUri && <Image source={{ uri: logoUri }} style={styles.logo} />}
      </View>

      <Input
        placeholder="Pesquisar"
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={styles.updateButton} onPress={list}>
        <Text style={styles.updateText}>Atualizar Lista</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={{
              ...item,
              categoryName: getCategoryName(item.categoryId) 
            }}
            onDelete={() => handleDelete(item.id)}
            onOpen={() => handleOpenEdit(item)}
          />
        )}
        contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
      />
    </View>
  );
};
