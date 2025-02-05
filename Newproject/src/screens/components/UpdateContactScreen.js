import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const API_URL = 'http://10.0.2.2:3000';

const UpdateContactScreen = () => {
  const [newName, setNewName] = useState('');
  const [user, setUser] = useState(null); // usamos este hoot de estado para Guardar los datos del usuario

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

  const handleGenerateCode = () => {
    console.log('Código de seguridad generado');
  };

  const handleContactSupport = () => {
    console.log('Contacto con atención al cliente iniciado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Actual: {user?.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Introduzca nuevo nombre"
        value={newName}
        onChangeText={setNewName}
      />

      <Text style={styles.subHeader}>---&gt; Pasos para actualizar su contacto &lt;---</Text>

      <Text style={styles.step}>1. Pulse aquí para generar su código de seguridad 👉</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerateCode}>
        <Text style={styles.buttonText}>🔑 Generar Código</Text>
      </TouchableOpacity>

      <Text style={styles.step}>
        2. Contacte con atención al cliente comunicándoles su necesidad y a su vez pegue el código
        generado en el paso anterior
      </Text>

      <Text style={styles.step}>3. Pulse aquí para contactar con atención al cliente 👉</Text>
      <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>📞 Contactar Atención al Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  step: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UpdateContactScreen;
