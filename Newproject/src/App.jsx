import { ActivityIndicator, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CarroScreen from './screens/CarroScreen';
import LoginScring from './login/LoginScreen';
import RegisterScreen from './login/RegisterScreen';
import SettingsComponets from './screens/components/settingsComponets';
import UpdateContactScreen from './screens/components/UpdateContactScreen';
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'purple',
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Carro"
        component={CarroScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
const SettingsComponent = () => {
  const handleSave = () => {
    Alert.alert('Datos guardados');
  };
  return handleSave();
};

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="/" component={MyTabs} />
      <Stack.Screen name="login" component={LoginScring} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Ajustes"
        component={SettingsComponets}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Mi Nombre"
        component={UpdateContactScreen}
        options={{
          headerShown: true,
          headerTitle: 'Ajustes', // Título del encabezado
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => SettingsComponent()}>
              <Text style={{ color: '#007BFF', fontSize: 16 }}>Guardar</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // se estara ejecutando el hook cuando nuestro screen estara renderizandoce
  // en 1000 ms veremos si el usuario esta logeado o no, gracias al hook ue
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
