// App.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './database/initializeDatabase';
import HomeScreen from './app/pages/HomeScreen';
import SecondScreen from './app/pages/SecondScreen';
import { LastProductProvider } from './app/context/LastProductContext';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SQLiteProvider
        databaseName="DONDOCA-STORE.db"    // Nome do banco
        onInit={initializeDatabase}
      >
        <LastProductProvider>
          <NavigationContainer>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Donndoca Store</Text> 
            </View>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#ffe4ec',
                tabBarStyle: { backgroundColor: '#ff69b4', height: 80 },
                tabBarIndicatorStyle: { backgroundColor: 'white' },
                tabBarLabelStyle: { fontWeight: 'bold' },
                tabBarIcon: ({ color }) => {
                  const iconName =
                    route.name === 'Estoque'
                      ? 'storefront'
                      : 'add-box';
                  return <MaterialIcons name={iconName} size={20} color={color} />;
                },
              })}
            > 
              <Tab.Screen name="Estoque" component={HomeScreen} />
              <Tab.Screen name="Cadastrar Produto" component={SecondScreen} />
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
    backgroundColor: '#ff69b4',
    paddingTop: 40, // espaço para o status bar (ajuste conforme necessário)
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

