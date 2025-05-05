// ./components/Product.js

import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function Product({ data, onDelete, onOpen, ...rest }) {
  return (
    <Pressable
      style={{
        backgroundColor: "pink",
        padding: 30,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
      }}
      {...rest}
    >
      <Text style={{ flex: 1, color:'white', fontWeight:'bold' }}>
        {data.name} - {data.quantity} unidades
      </Text>

      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpen}>
        <MaterialIcons name="visibility" size={24} color="white" />
      </TouchableOpacity>
    </Pressable>
  );
}
