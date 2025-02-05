import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { API_URL } from '../../config/apiconfig';
const API_URL = 'http://10.0.2.2:3000'; // Android Emulator

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleInputChange = async () => {
    if (!validateForm()) return; // Verificación de formulario

    setLoading(true);

    try {
      const endpoint = `${API_URL}/register`;
      const response = await axios.post(endpoint, {
        email,
        password,
        confirmPassword,
      });

      console.log('Respuesta del servidor:', response.data);
      if (response.status === 200) {
        await AsyncStorage.setItem('id', JSON.stringify(response.data));
        console.log('Usuario guardado, navegando a Login');
        navigation.navigate('login');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      const errorMessage =
        error.response?.data?.message || 'Error al registrarse, intentalo de nuevo.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Email"
          value={email}
          style={styles.textInput}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Ingrese su contraseña"
          value={password}
          style={styles.textInput}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="confirme su contraseña"
          value={confirmPassword}
          style={styles.textInput}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <Button
          title={loading ? 'Registrando...' : 'Registrarse'}
          onPress={() => {
            handleInputChange();
          }}
        >
          <Text>REGISTRARSE</Text>
        </Button>
      </View>
      <View style={styles.button}>
        <Pressable onPress={() => navigation.navigate('login')}>
          <Text>INICIAR SESION</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    padding: 5,
    backgroundColor: '#ddd',
    marginTop: 5,
    borderTopEndRadius: 8,
    width: '100%',
    maxWidth: 390,
  },
  button: {
    marginTop: 8,
  },
  errorMessage: {
    color: 'red',
  },
});

export default RegisterScreen;
