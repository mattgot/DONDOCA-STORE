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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  checkbox: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  checked: {
    backgroundColor: '#e6f2ff',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  denied: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
