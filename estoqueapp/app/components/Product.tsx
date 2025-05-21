import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

// Habilitar LayoutAnimation no Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Tipagem dos dados do produto
type ProductData = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  categoryName?: string; 
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
  const isLowStock = data.quantity < 5;

  const renderRightActions = () => (
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={(event) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          onDelete?.(event);
        }}
        style={styles.actionButton}
      >
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
            <Text
              testID={`product-name-${data.id}`}
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.name} - {data.quantity} unidades
            </Text>
          </View>

          <Text style={styles.statusText}>
            {isInStock ? "Em estoque" : "Fora de estoque"}
          </Text>

          {isLowStock && (
            <Text style={styles.lowStockText}>Estoque baixo!</Text>
          )}

          <Text style={styles.priceText}>
            Preço unitário: R$ {(data.unitPrice ?? 0).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </Text>

          <Text style={styles.totalText}>
            Total: R$ {((data.unitPrice ?? 0) * (data.quantity ?? 0)).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </Text>

          {data.categoryName && (
            <Text style={styles.categoryText}>
              Categoria: {data.categoryName}
            </Text>
          )}
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
  lowStockText: {
    fontSize: 12,
    color: "#e67e22",
    marginTop: 2,
  },
  priceText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  totalText: {
    fontSize: 13,
    color: "#000",
    fontWeight: "bold",
    marginTop: 2,
  },
  categoryText: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
    fontStyle: "italic",
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
