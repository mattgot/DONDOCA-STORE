// ./components/Product.tsx

import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

// Tipagem dos dados do produto
type ProductData = {
  id: number;
  name: string;
  quantity: number;
};

// Tipagem das props do componente
type ProductProps = {
  data: ProductData;
  onDelete?: (event: GestureResponderEvent) => void;
  onOpen?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

export function Product({ data, onDelete, onOpen, style }: ProductProps) {
  const isInStock = data.quantity > 0;

  const renderRightActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpen} style={styles.actionButtonAlt}>
        <MaterialIcons name="visibility" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={StyleSheet.compose(styles.container, style)}>
        <View style={styles.info}>
          <View style={styles.statusRow}>
            <MaterialIcons
              name={isInStock ? "check-circle" : "error-outline"}
              size={20}
              color={isInStock ? "#27ae60" : "#e74c3c"}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.title}>
              {data.name} - {data.quantity} unidades
            </Text>
          </View>
          <Text style={styles.statusText}>
            {isInStock ? "Em estoque" : "Fora de estoque"}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
  },
  info: {
    flex: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  statusText: {
    fontSize: 13,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  actionButtonAlt: {
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "100%",
  },
});
