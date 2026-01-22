import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={styles.innerBox}>
          <Text style={styles.title}>Login</Text>

          {/* Username Input */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={24} color="#2ecc71" style={styles.icon} />
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={24} color="#2ecc71" style={styles.icon} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.buttonContainer} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Error Message */}
          {msg ? <Text style={styles.error}>{msg}</Text> : null}

          {/* Optional: Register Link */}
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2ecc71',
    marginBottom: 18,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 8,
    color: '#2ecc71',
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#333',
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
    borderWidth: 2,
    borderColor: '#2ecc71',
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
