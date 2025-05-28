import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import  styles  from 'app/styles/styles_sidebar.js';

// Páginas
import CatalogoScreen from './app/pages/HomeScreen';
import CadastroProdutoScreen from './app/pages/SecondScreen';
import DashboardScreen from './app/pages/DashboardScreen';
import SettingsScreen from './app/pages/SettingsScreen';
import ConfigCategoriasScreen from './app/pages/ConfigCategoriasScreen';
import CadastroCategoriaScreen from './app/pages/CadastroCategoriaScreen';
import ListaCategoriasScreen from './app/pages/ListaCategoriasScreen';
import CadastroClienteScreen from './app/pages/CadastroClienteScreen';
import ListaClientesScreen from './app/pages/ListaClientesScreen';
import RestaurarBackupScreen from './app/pages/RestaurarBackupScreen';
import MenuClientesScreen from './app/pages/MenuClientesScreen';
import { MenuCadastrosScreen } from './app/pages/MenuCadastrosScreen';
import { MenuEstoqueScreen } from './app/pages/MenuEstoqueScreen';
import LoginScreen from './app/pages/LoginScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  const [username, setUsername] = useState('');
  const [logoUri, setLogoUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedLogo = await AsyncStorage.getItem('logo');
      if (storedUsername) setUsername(storedUsername);
      if (storedLogo) setLogoUri(storedLogo);
    })();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, justifyContent: 'space-between', backgroundColor:'#ff85c1' }}
    >
      <View>
        <View style={styles.drawerHeader}>
          {logoUri && <Image source={{ uri: logoUri }} style={styles.drawerLogo} />}
          <Text style={styles.drawerUser}>Bem-vindo{username ? `, ${username}` : ''}!</Text>
        </View>

        <DrawerItem
          label="Catálogo"
          labelStyle={{ color: 'white' }} // cor do texto
          icon={({ size }) => (
            <MaterialIcons name="inventory" color="white" size={size} /> // cor do ícone
          )}
          onPress={() => props.navigation.navigate('Catalogo')}
        />
        <DrawerItem
          label="Clientes"
          labelStyle={{ color: 'white' }}
          icon={({ size }) => (
            <MaterialIcons name="people" color="white" size={size} />
          )}
          onPress={() => props.navigation.navigate('Clientes')}
        />
        <DrawerItem
          label="Estoque"
          labelStyle={{ color: 'white' }}
          icon={({ color, size }) => (
            <MaterialIcons name="insights" color='white' size={size} />
          )}
          onPress={() => props.navigation.navigate('Estoque')}
        />
        <DrawerItem
          label="Cadastros"
          labelStyle={{ color: 'white' }}
          icon={({ color, size }) => (
            <MaterialIcons name="playlist-add-check" color='white' size={size} />
          )}
          onPress={() => props.navigation.navigate('Cadastros')}
        />
      </View>

      <View>
        <DrawerItem
          label="Configurações"
          labelStyle={{ color: 'white' }}
          icon={({ color, size }) => (
            <MaterialIcons name="settings" color='white' size={size} />
          )}
          onPress={() => props.navigation.navigate('Configuracoes')}
        />
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'white' }}
          icon={({ color, size }) => (
            <MaterialIcons name="logout" color='white' size={size} />
          )}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Catalogo"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* Telas principais */}
      <Drawer.Screen name="Catalogo" component={CatalogoScreen} />
      <Drawer.Screen name="Clientes" component={MenuClientesScreen} />
      <Drawer.Screen name="Estoque" component={MenuEstoqueScreen} />
      <Drawer.Screen name="Cadastros" component={MenuCadastrosScreen} />
      <Drawer.Screen name="Configuracoes" component={SettingsScreen} />

      {/* Telas acessadas via navegação direta */}
      <Drawer.Screen name="CadastroProduto" component={CadastroProdutoScreen} />
      <Drawer.Screen name="CadastroCategoria" component={CadastroCategoriaScreen} />
      <Drawer.Screen name="ListaCategorias" component={ListaCategoriasScreen} />
      <Drawer.Screen name="GerenciarCategorias" component={ConfigCategoriasScreen} />
      <Drawer.Screen name="CadastroCliente" component={CadastroClienteScreen} />
      <Drawer.Screen name="ListaClientes" component={ListaClientesScreen} />
      <Drawer.Screen name="RestaurarBackup" component={RestaurarBackupScreen} />
      <Drawer.Screen name="Relatorios" component={DashboardScreen} />
    </Drawer.Navigator>
  );
}

export default function RootNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('user');
      setIsAuthenticated(!!user);
    })();
  }, []);

  if (isAuthenticated === null) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Drawer" component={DrawerRoutes} />
    </Stack.Navigator>
  );
}