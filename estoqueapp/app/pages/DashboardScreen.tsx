import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useProductsDatabase } from "@db/useProductsDatabase";
import { PieChart } from "react-native-chart-kit";
import  styles  from '../styles/styles.js';

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const { getTotalStockValue, searchByName } = useProductsDatabase();
  const [totalValue, setTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [okStockCount, setOkStockCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const products = await searchByName("");
        const value = await getTotalStockValue();

        const lowStock = products.filter((p) => p.quantity < 5);
        const okStock = products.length - lowStock.length;

        setTotalValue(value);
        setTotalProducts(products.length);
        setTotalQuantity(products.reduce((acc, p) => acc + p.quantity, 0));
        setLowStockCount(lowStock.length);
        setOkStockCount(okStock);
      }

      loadData();
    }, [])
  );

  const pieData = [
    {
      name: "Estoque OK",
      quantity: okStockCount,
      color: "#2ecc71",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Estoque Baixo",
      quantity: lowStockCount,
      color: "#e74c3c",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo de Estoque</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total de Produtos:</Text>
        <Text style={styles.value}>{totalProducts}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Quantidade Total:</Text>
        <Text style={styles.value}>{totalQuantity}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Valor Total (R$):</Text>
        <Text style={styles.value}>{totalValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Distribuição de Estoque</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 48}
          height={180}
          chartConfig={chartConfig}
          accessor="quantity"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForLabels: {
    fontSize: 12,
  },
};
