// ./pages/HomeScreen.js

import React, { useState, useEffect } from "react";
import { View, Button, Alert, FlatList, Text, TouchableOpacity } from "react-native";
import { useProductDatabase } from "../database/useProductsDatabase"; // ajusta o caminho
import { Input } from "./components/Input";
import { Product } from "./components/Product";

export default function HomeScreen({ navigation }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const productDatabase = useProductDatabase();

  async function create() {
    if (isNaN(Number(quantity))) {
      return Alert.alert("Quantidade", "A quantidade precisa ser um número!");
    }

    const response = await productDatabase.create({
      name,
      quantity: Number(quantity),
    });

    Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId);
  }

  async function update() {
    if (isNaN(Number(quantity))) {
      return Alert.alert("Quantidade", "A quantidade precisa ser um número!");
    }

    await productDatabase.update({
      id: Number(id),
      name,
      quantity: Number(quantity),
    });

    Alert.alert("Produto atualizado!");
  }

  async function list() {
    const response = await productDatabase.searchByName(search);
    setProducts(response);
  }

  async function remove(id) {
    await productDatabase.remove(id);
    await list();
  }

  function details(item) {
    setId(String(item.id));
    setName(item.name);
    setQuantity(String(item.quantity));
  }

  async function handleSave() {
    if (id) {
      await update();
    } else {
      await create();
    }

    setId("");
    setName("");
    setQuantity("");
    await list();
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 32, gap: 16 }}>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
      />

        <TouchableOpacity
        onPress={handleSave}
        style={{
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 8,
            borderWidth:2,
            borderColor:'pink',
            alignItems: 'center',
            marginTop: 10,
        }}
        >
        <Text style={{ color: 'pink', fontSize: 16, fontWeight: 'bold' }}>
            Salvar
        </Text>
        </TouchableOpacity>

      <Input placeholder="Pesquisar" onChangeText={setSearch} />

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onOpen={() => navigation.navigate("Details", { id: item.id })}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}
