import React from 'react';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './database/initializeDatabase';
import { LastProductProvider } from './app/context/LastProductContext';
import RootNavigation from './RootNavigation';

export default function App() {
  const scheme = useColorScheme(); // Detecta tema do sistema

  return (
    <GestureHandlerRootView style={styles.container}>
      <SQLiteProvider
        databaseName="DONDOCA-STORE.db"
        onInit={initializeDatabase} // Cria tabelas, admin etc.
      >
        <LastProductProvider>
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <RootNavigation />
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
});
