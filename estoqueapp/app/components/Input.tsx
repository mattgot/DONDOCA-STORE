import React, { useState, useEffect } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Platform,
} from "react-native";

type InputProps = TextInputProps & {
  isCurrency?: boolean;
  onValueChange?: (value: number) => void; // valor numérico limpo
};

export function Input({
  isCurrency,
  onChangeText,
  onValueChange,
  value,
  ...rest
}: InputProps) {
  const [formatted, setFormatted] = useState("");

  // Atualiza a formatação quando valor externo muda
  useEffect(() => {
    if (isCurrency && value !== undefined && value !== null) {
      const numeric = typeof value === "number" ? value : parseFloat(value.toString().replace(",", "."));
      const formattedValue = numeric.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      setFormatted(formattedValue);
    }
  }, [value, isCurrency]);

  function handleCurrencyChange(text: string) {
    const raw = text.replace(/\D/g, "");
    const number = parseFloat(raw) / 100;

    const formattedValue = isNaN(number)
      ? "R$ 0,00"
      : number.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

    setFormatted(formattedValue);

    if (onChangeText) {
      onChangeText(formattedValue); // opcional, se precisar da string
    }

    if (onValueChange) {
      onValueChange(number); // aqui vai o valor limpo
    }
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType={isCurrency ? "numeric" : rest.keyboardType}
        value={isCurrency ? formatted : value}
        onChangeText={isCurrency ? handleCurrencyChange : onChangeText}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    ...Platform.select({
      android: { paddingVertical: 10 },
      ios: { paddingVertical: 14 },
    }),
  },
});
