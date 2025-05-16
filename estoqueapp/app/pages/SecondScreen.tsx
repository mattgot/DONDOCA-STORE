import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "@components/Input";
import { useProductsDatabase } from "@db/useProductsDatabase";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

type ProductType = {
  id: number;
  name: string;
  quantity: number;
};

type RootStackParamList = {
  CadastroProduto: { product?: ProductType };
};

type CadastroProdutoRouteProp = RouteProp<RootStackParamList, "CadastroProduto">;

export default function SecondScreen() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const route = useRoute<CadastroProdutoRouteProp>();
  const navigation = useNavigation();
  const productDatabase = useProductsDatabase();

  useEffect(() => {
    if (route.params?.product) {
      const { id, name, quantity } = route.params.product;
      setId(String(id));
      setName(name);
      setQuantity(String(quantity));
    }
  }, [route.params]);

  async function handleSave() {
    if (!name.trim()) return Alert.alert("Nome obrigatório!");
    if (isNaN(Number(quantity))) return Alert.alert("Quantidade inválida!");

    if (id) {
      await productDatabase.update({
        id: Number(id),
        name,
        quantity: Number(quantity),
      });
      Toast.show("Produto atualizado com sucesso!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } else {
      const response = await productDatabase.create({
        name,
        quantity: Number(quantity),
      });
      Toast.show("Produto criado com ID: " + response.insertedRowId, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }

    setId("");
    setName("");
    setQuantity("");
    navigation.goBack();
  }


  async function handleDelete() {
    Alert.alert(
      "Remover Produto",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await productDatabase.remove(Number(id));
            Toast.show("Produto excluído com sucesso!", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            });
            setId("");
            setName("");
            setQuantity("");
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>
          {id ? "Atualizar" : "Salvar"}
        </Text>
      </TouchableOpacity>

      {id !== "" && (
        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.button, { borderColor: "red" }]}
        >
          <Text style={[styles.buttonText, { color: "red" }]}>
            Excluir Produto
          </Text>
        </TouchableOpacity>
      )}
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
  button: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "pink",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "pink",
    fontSize: 16,
    fontWeight: "bold",
  },
});
