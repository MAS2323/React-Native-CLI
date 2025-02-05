import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, Switch } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const API_URL = 'http://10.0.2.2:3000';

const SettingsComponets = () => {
  const [user, setUser] = useState(null); // Guarda los datos del usuario
  const navigation = useNavigation();

  // Obtener el token almacenado en AsyncStorage y recuperar datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          return;
        }

        // const decodedToken = jwtDecode(token);
        // const userId = decodedToken.id; // Asegúrate de que el token tiene el ID del usuario
        // Si tienes el userId guardado en AsyncStorage, utilízalo
        const userId = await AsyncStorage.getItem('userId');
        console.log('userId guardado en AsyncStorage:', userId);

        const response = await axios.get(`${API_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setUser(response.data);
        } else {
          Alert.alert('Error', 'No se pudieron obtener los datos del usuario.');
        }
      } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const userLogout = async () => {
    // modulo del logout, lo hacemos eliminando todos los datos que el usuario ingreso de forma local
    // y le dirigimos a la pantalla de login
    try {
      const id = await AsyncStorage.getItem('id');
      const userId = `user${JSON.parse(id)}`;
      await AsyncStorage.multiRemove([userId, 'id']);
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  const toggleSwitch = () => setIsNotificationsEnabled((previousState) => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.changeImageText}>Cambiar Imagen</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsOptions}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Mi Nombre')}>
          <Text style={styles.optionText}>Mi Nombre</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Datos de envío</Text>
        </TouchableOpacity>
        <View style={styles.option}>
          <Text style={styles.optionText}>Notificaciones</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => userLogout()}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.deleteAccountText}>Borrar cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsComponets;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backArrow: {
    fontSize: 20,
    color: '#000',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 40,
  },
  changeImageText: {
    fontSize: 16,
    color: '#ff6f00',
    fontWeight: 'bold',
  },
  settingsOptions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  value: {
    color: '#999',
    fontSize: 16,
  },
  actions: {
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteAccountText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
