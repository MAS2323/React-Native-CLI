import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const API_URL = 'http://10.0.2.2:3000';

const CarroScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`${API_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
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
      <View style={styles.container}>
        <Text>Has cerrado sesion</Text>
        <View>
          <Text>
            Inicia sesion para acceder a tu cuenta y disfrutar de funciones personalizadas
          </Text>
        </View>
        <View>
          <Button title="Iniciar Sesion" onPress={() => navigation.navigate('login')} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>No tiene ningun producto</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CarroScreen;
