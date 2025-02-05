import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://10.0.2.2:3000';
import axios from 'axios';
import ProfileMenu from './components/profileMenu';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login
  const navigation = useNavigation();

  // Obtener el token almacenado en AsyncStorage y recuperar datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
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
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          Alert.alert('Error', 'No se pudieron obtener los datos del usuario.');
        }
      } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  if (!isLoggedIn) {
    return (
      <View style={styles.containerSesion}>
        <Text style={styles.logoutMessage}>Has cerrado sesión</Text>
        <Text style={styles.infoText}>
          Inicia sesión para acceder a tu cuenta y disfrutar de funciones personalizadas.
        </Text>
        <Button title="Iniciar Sesión" onPress={() => navigation.navigate('login')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Ajustes')}
      >
        <Text style={styles.gearIcon}>⚙️</Text>
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        <Text style={styles.email}>{user?.email || 'Usuario'}</Text>
      </View>
      <ProfileMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  containerSesion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  gearIcon: {
    fontSize: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
