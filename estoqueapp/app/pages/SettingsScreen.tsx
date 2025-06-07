import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Input } from "@components/Input";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth"; // certifique-se que o caminho está correto
import  styles  from '../styles/styles.js';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const [username, setUsername] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoUri, setLogoUri] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedNotifications = await AsyncStorage.getItem("notifications");
      const storedLogo = await AsyncStorage.getItem("logo");

      if (storedUsername) setUsername(storedUsername);
      if (storedNotifications)
        setNotificationsEnabled(storedNotifications === "true");
      if (storedLogo) setLogoUri(storedLogo);
    }

    loadSettings();
  }, []);

  async function handleSave() {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("notifications", notificationsEnabled.toString());
      if (logoUri) await AsyncStorage.setItem("logo", logoUri);
      Alert.alert("Sucesso", "Configurações salvas!");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  async function pickLogo() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0].uri) {
      setLogoUri(result.assets[0].uri);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações Gerais</Text>

      <Input
        placeholder="Nome para mensagem de boas-vindas"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.container}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logo} />
        ) : (
          <Text style={styles.label}>Nenhuma logo selecionada</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={pickLogo}>
          <Text style={styles.button}>Selecionar Logo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
        <Text style={styles.updateButton}>Salvar Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e74c3c" }]}
        onPress={signOut}
      >
        <MaterialIcons name="logout" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}