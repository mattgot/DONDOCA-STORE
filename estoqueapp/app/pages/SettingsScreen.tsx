import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.logoContainer}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logo} />
        ) : (
          <Text style={styles.label}>Nenhuma logo selecionada</Text>
        )}
        <TouchableOpacity style={styles.logoButton} onPress={pickLogo}>
          <Text style={styles.logoButtonText}>Selecionar Logo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Configurações</Text>
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

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  logoContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  logoButton: {
    backgroundColor: "#ff69b4",
    padding: 10,
    borderRadius: 8,
  },
  logoButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
