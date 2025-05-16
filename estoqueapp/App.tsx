// App.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './database/initializeDatabase';
import HomeScreen from './app/pages/HomeScreen';
import SecondScreen from './app/pages/SecondScreen';
import { LastProductProvider } from './app/context/LastProductContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerStyle: { backgroundColor: '#ffb6c1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Estoque Dondoca"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Estoque Dondoca',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroProduto')}
              style={{ marginRight: 12 }}
            >
              <MaterialIcons name="add-box" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CadastroProduto"
        component={SecondScreen}
        options={{ title: 'Cadastro de Produto' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SQLiteProvider
        databaseName="DONDOCA-STORE.db"
        onInit={initializeDatabase}
      >
        <LastProductProvider> 
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#ff69b4',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: { backgroundColor: '#fff' },
                tabBarIcon: ({ color, size }) => {
                  const iconName =
                    route.name === 'Início'
                      ? 'storefront'
                      : 'add-circle-outline';

                  return (
                    <MaterialIcons name={iconName} size={size} color={color} />
                  );
                },
              })}
            >
              <Tab.Screen name="Início" component={HomeStack} />
              <Tab.Screen name="Cadastrar" component={SecondScreen} />
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
});
