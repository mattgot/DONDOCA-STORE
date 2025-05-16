// ✅ Nova versão da HomeScreen.tsx que apenas lista, atualiza e permite edição/exclusão

import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useProductsDatabase } from "@db/useProductsDatabase";
import { Input } from "@components/Input";
import { Product } from "@components/Product";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Tipagens

type ProductType = {
  id: number;
  name: string;
  quantity: number;
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

  const productDatabase = useProductsDatabase();

  async function list() {
    const response = await productDatabase.searchByName(search);
    setProducts(response);
  }

  async function handleDelete(productId: number) {
    Alert.alert(
      "Remover Produto",
      "Tem certeza que deseja excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
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

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={styles.container}>
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
            data={item}
            onDelete={() => handleDelete(item.id)}
            onOpen={() => handleOpenEdit(item)}
          />
        )}
        contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    backgroundColor: "pink",
  },
  updateButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff69b4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  updateText: {
    color: "#ff69b4",
    fontSize: 16,
    fontWeight: "bold",
  },
});
