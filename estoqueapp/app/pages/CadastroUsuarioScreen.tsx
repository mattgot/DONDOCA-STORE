import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthDatabase } from '../database/useAuthDatabase';
import { useNavigation } from '@react-navigation/native';
import  styles  from '../styles/styles.js';

export default function CadastroUsuarioScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const { createUser } = useAuthDatabase();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setAuthorized(user?.isAdmin);
      }
    })();
  }, []);

  async function handleCreate() {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await createUser(username, password, isAdmin);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
      setUsername('');
      setPassword('');
    } catch (err) {
      Alert.alert('Erro ao cadastrar usuário', err.message);
    }
  }

  if (!authorized) {
    return (
      <View style={styles.container}>
        <Text style={styles.denied}>Acesso restrito para administradores.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.checkbox, isAdmin && styles.checked]}
        onPress={() => setIsAdmin(!isAdmin)}
      >
        <Text style={styles.checkboxLabel}>{isAdmin ? '✔ ' : ''}Administrador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

