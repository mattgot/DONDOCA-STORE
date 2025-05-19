import React from 'react';
import { StyleSheet, View, Text, useColorScheme, Image } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './database/initializeDatabase';
import HomeScreen from './app/pages/HomeScreen';
import SecondScreen from './app/pages/SecondScreen';
import DashboardScreen from './app/pages/DashboardScreen';
import SettingsScreen from './app/pages/SettingsScreen';
import { LastProductProvider } from './app/context/LastProductContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  const [logoUri, setLogoUri] = useState<string | null>(null);

  useEffect(() => {
    async function loadLogo() {
      const storedLogo = await AsyncStorage.getItem('logo');
      if (storedLogo) setLogoUri(storedLogo);
    }
    loadLogo();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SQLiteProvider
        databaseName="DONDOCA-STORE.db"
        onInit={initializeDatabase}
      >
        <LastProductProvider>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <View style={styles.header}>
              {logoUri && <Image source={{ uri: logoUri }} style={styles.logo} />}
              <Text testID="header-title" style={styles.headerTitle}>Dondoca Store</Text>
            </View>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#ffe4ec',
                tabBarStyle: { backgroundColor: '#ff69b4', height: 80 },
                tabBarIndicatorStyle: { backgroundColor: 'white' },
                tabBarLabelStyle: { fontWeight: 'bold' },
                tabBarIcon: ({ color }) => {
                  const iconMap: Record<string, string> = {
                    'Estoque': 'storefront',
                    'Cadastrar Produto': 'add-box',
                    'Relatórios': 'insights',
                    'Configurações': 'settings',
                  };
                  return <MaterialIcons name={iconMap[route.name] || 'help'} size={24} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Estoque" component={HomeScreen} />
              <Tab.Screen name="Cadastrar Produto" component={SecondScreen} />
              <Tab.Screen name="Relatórios" component={DashboardScreen} />
              <Tab.Screen name="Configurações" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </LastProductProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff69b4',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 6,
  },
});
