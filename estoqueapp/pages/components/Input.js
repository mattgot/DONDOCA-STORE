import React from "react";
import { TextInput } from "react-native";

export function Input(props) {
  return (
    <TextInput
      style={{
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#999",
        paddingHorizontal: 16,
      }}
      {...props}
    />
  );
}