import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
  // AsyncStorage,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import { API_URL } from '../../config/apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://10.0.2.2:3000';

const LoginScring = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // const validateForm = () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'El correo y la contraseña son obligatorios.');
  //     return false;
  //   }
  //   return true;
  // };

  const handleLogin = async () => {
    try {
      // request para hacer el login del usuario
      const res = await axios.post(`${API_URL}/login`, { email, password });
      if (res.data && res.data.token) {
        await AsyncStorage.setItem('token', res.data.token);
        console.log('userId guardado en AsyncStorage:', res.data.userId);
        setLoading(true);
        navigation.navigate('/');
      } else {
        console.error('Respuesta incorrecta:', res.data);
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
          placeholder="Contraseña"
          value={password}
          style={styles.textInput}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <Button
          title={loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          onPress={() => {
            handleLogin();
          }}
        >
          <Text>ACCEDER</Text>
        </Button>
      </View>
      <Text>Olvide mi contraseña?</Text>
      <View style={styles.button}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text>REGISTRARSE</Text>
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
});

export default LoginScring;
