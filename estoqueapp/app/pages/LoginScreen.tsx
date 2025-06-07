import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthDatabase } from '../../database/useAuthDatabase';
import { useNavigation } from '@react-navigation/native';
import  styles  from '../styles/styles.js';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { validateLogin } = useAuthDatabase();
  const navigation = useNavigation();

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const user = await validateLogin(username, password);
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Bem-vindo', `Olá, ${user.username}!`);

        // Redireciona corretamente para o menu principal
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Drawer',
              state: {
                index: 0,
                routes: [{ name: 'Catálogo' }],
              },
            },
          ],
        });
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos.');
      }
    } catch (err) {
      Alert.alert('Erro ao logar', err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
