import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Input } from "@components/Input";
import { useProductsDatabase } from "@db/useProductsDatabase";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

type ProductType = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
};

type RootStackParamList = {
  CadastroProduto: { product?: ProductType };
};

type CadastroProdutoRouteProp = RouteProp<RootStackParamList, "CadastroProduto">;

export default function SecondScreen() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  const nameRef = useRef<TextInput>(null);

  const route = useRoute<CadastroProdutoRouteProp>();
  const navigation = useNavigation();
  const productDatabase = useProductsDatabase();

  useEffect(() => {
    if (route.params?.product) {
      const { id, name, quantity, unitPrice } = route.params.product;
      setId(String(id));
      setName(name);
      setQuantity(String(quantity));
      setUnitPrice((unitPrice || 0).toFixed(2).replace(".", ","));
    }
  }, [route.params]);

  function resetForm() {
    setId("");
    setName("");
    setQuantity("");
    setUnitPrice("");
    nameRef.current?.focus();
  }

  async function handleSave() {
    if (!name.trim()) return Alert.alert("Nome obrigatório!");
    if (isNaN(Number(quantity))) return Alert.alert("Quantidade inválida!");

    const cleaned = unitPrice.replace(/\D/g, "");
    const priceParsed = parseFloat(cleaned) / 100;

    if (isNaN(priceParsed) || priceParsed <= 0)
      return Alert.alert("Preço unitário inválido!");

    const productData = {
      name,
      quantity: Number(quantity),
      unitPrice: priceParsed,
    };

    console.log("Salvando produto:", { id, ...productData });

    try {
      if (id) {
        await productDatabase.update({ id: Number(id), ...productData });
        Toast.show("Produto atualizado com sucesso!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      } else {
        const response = await productDatabase.create(productData);
        Toast.show("Produto criado com ID: " + response.insertedRowId, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }

      resetForm();

      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error);
      Alert.alert("Erro ao salvar produto:", error.message || "Erro desconhecido.");
    }
  }

  async function handleDelete() {
    Alert.alert("Remover Produto", "Tem certeza que deseja excluir este produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await productDatabase.remove(Number(id));
            Toast.show("Produto excluído com sucesso!", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            });
            resetForm();
            setTimeout(() => navigation.goBack(), 400);
          } catch (error: any) {
            console.error("Erro ao excluir produto:", error);
            Alert.alert("Erro ao excluir produto:", error.message);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nome"
        onChangeText={setName}
        value={name}
        ref={nameRef}
      />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
        keyboardType="numeric"
      />
      <Input
        placeholder="Preço Unitário (R$)"
        value={unitPrice}
        onChangeText={setUnitPrice}
        isCurrency
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>{id ? "Atualizar" : "Salvar"}</Text>
      </TouchableOpacity>

      {id !== "" && (
        <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Excluir Produto</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    backgroundColor: "#f8f8f8",
  },
  button: {
    backgroundColor: "#ff69b4",
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ff69b4",
    alignItems: "center",
    marginTop: 10,
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#555",
    fontSize: 16,
  },
});
