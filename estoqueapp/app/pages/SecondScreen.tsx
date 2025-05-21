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
import { useCategoriesDatabase } from "@db/useCategoriesDatabase";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Picker } from "@react-native-picker/picker";

type ProductType = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  categoryId?: number;
};

type RootStackParamList = {
  CadastroProduto: { product?: ProductType };
};

type CadastroProdutoRouteProp = RouteProp<RootStackParamList, "CadastroProduto">;

export default function SecondScreen() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [categorias, setCategorias] = useState([]);

  const nameRef = useRef<TextInput>(null);

  const route = useRoute<CadastroProdutoRouteProp>();
  const navigation = useNavigation();

  const productDatabase = useProductsDatabase();
  const { listCategories } = useCategoriesDatabase();

  useEffect(() => {
    if (route.params?.product) {
      const { id, name, quantity, unitPrice, categoryId } = route.params.product;
      setId(String(id));
      setName(name);
      setQuantity(String(quantity));
      setUnitPrice(unitPrice ?? 0);
      setCategoryId(categoryId); 
    }
  }, [route.params]);

  useEffect(() => {
    async function carregarCategorias() {
      const lista = await listCategories();
      setCategorias(lista);
    }

    carregarCategorias();
  }, []);

  function resetForm() {
    setId("");
    setName("");
    setQuantity("");
    setUnitPrice(0);
    setCategoryId(undefined);
    nameRef.current?.focus();
  }

  async function handleSave() {
    if (!name.trim()) return Alert.alert("Nome obrigatório!");
    if (isNaN(Number(quantity))) return Alert.alert("Quantidade inválida!");
    if (isNaN(unitPrice) || unitPrice <= 0)
      return Alert.alert("Preço unitário inválido!");

    const productData = {
      name,
      quantity: Number(quantity),
      unitPrice: unitPrice,
      categoryId,
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
      setTimeout(() => navigation.goBack(), 500);
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
        isCurrency
        onValueChange={setUnitPrice}
      />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoryId ?? 0}
          onValueChange={(itemValue) => {
            setCategoryId(itemValue === 0 ? undefined : itemValue);
          }}
        >
          <Picker.Item label="Selecione uma categoria" value={0} />
          {categorias.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>
      </View>


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
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 8,
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
