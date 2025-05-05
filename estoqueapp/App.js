// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './database/initializeDatabase';

import HomeScreen from './pages/HomeScreen';
import { PlatformColor } from 'react-native';
// importa outras telas como DetailsScreen se quiser

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SQLiteProvider databaseName="DONDOCA-STORE.db" onInit={initializeDatabase}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Estoque Dondoca" component={HomeScreen} />
          {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}