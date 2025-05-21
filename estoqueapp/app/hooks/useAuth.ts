import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function useAuth() {
  const navigation = useNavigation();

  async function signOut() {
    await AsyncStorage.clear();
    Alert.alert("Logout", "Sessão encerrada.");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return {
    signOut,
  };
}
