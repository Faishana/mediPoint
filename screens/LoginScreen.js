// screens/LoginScreen.js
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={[styles.innerBox, { borderRadius: 30 }]}> 
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="person" size={24} color="#2196f3" style={styles.icon} />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={24} color="#2196f3" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={login} color="#2196f3" />
        </View>
        {msg ? <Text style={styles.error}>{msg}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6f6',
    justifyContent: 'center',
    padding: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 32,
    alignSelf: 'center',
    letterSpacing: 1.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#b0c4de',
    marginBottom: 18,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#2196f3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  buttonContainer: {
    marginTop: 8,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  error: {
    color: '#d32f2f',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  innerBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom:50
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,
    elevation: 4,
  },
});
