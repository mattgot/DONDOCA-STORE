import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Platform,
} from "react-native";

export function Input(props: TextInputProps) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
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
