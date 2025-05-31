import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useClientsDatabase } from "@db/useClientsDatabase";
import  styles  from '../styles/styles.js';

export default function CadastroClienteScreen() {
  const { createClient } = useClientsDatabase();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  async function handleSalvar() {
    if (!name.trim()) {
      Alert.alert("Erro", "O nome é obrigatório.");
      return;
    }

    try {
      await createClient({ name, phone, email, address });
      Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
    } catch (err) {
      Alert.alert("Erro", "Erro ao salvar cliente.");
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Cliente</Text>
      </TouchableOpacity>
    </View>
  );
}
