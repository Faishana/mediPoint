import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');

  const login = async () => {
    const data = await AsyncStorage.getItem('user');
    if (!data) return setMsg('No user found');

    const user = JSON.parse(data);
    if (username === user.username && password === user.password) {
      navigation.replace('Main');
    } else {
      setMsg('Invalid credentials');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={styles.innerBox}>
          <Text style={styles.title}>Login</Text>

          {/* Username Input */}
          <PaperInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            left={<PaperInput.Icon icon={() => <Ionicons name="person" size={24} color="#2ecc71" />} />}
            style={styles.input}
            theme={{
              colors: {
                primary: '#2ecc71',
                outline: '#2ecc71',
              },
            }}
            outlineColor="#ddd"
            activeOutlineColor="#2ecc71"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <PaperInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            mode="outlined"
            left={<PaperInput.Icon icon={() => <Ionicons name="lock-closed" size={24} color="#2ecc71" />} />}
            right={
              <PaperInput.Icon
                icon={() => (
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#2ecc71"
                  />
                )}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
            theme={{
              colors: {
                primary: '#2ecc71',
                outline: '#2ecc71',
              },
            }}
            outlineColor="#ddd"
            activeOutlineColor="#2ecc71"
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.buttonContainer} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Error Message */}
          {msg ? <Text style={styles.error}>{msg}</Text> : null}

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFAD5',
    justifyContent: 'center',
    padding: 28,
  },
  innerBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginBottom: 50,
    elevation: 6,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 32,
    alignSelf: 'center',
    letterSpacing: 1.2,
  },
  input: {
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2ecc71',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#d32f2f',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,
    elevation: 4,
    
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});