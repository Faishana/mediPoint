import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperInput } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const register = async () => {
    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
      navigation.replace('Login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="app-registration" size={60} color="#2ecc71" />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
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
            />

            <PaperInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              mode="outlined"
              left={<PaperInput.Icon icon={() => <Ionicons name="lock-closed" size={24} color="#2ecc71" />} />}
              right={
                <PaperInput.Icon
                  icon={() => <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#2ecc71" />}
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

            {error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={20} color="#ff4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity style={styles.registerButton} onPress={register}>
              <Text style={styles.registerButtonText}>Register</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECFAD5' },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2ecc71', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#2ecc71', opacity: 0.8 },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  input: { marginBottom: 15, backgroundColor: '#fff' },
  errorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFAD5', padding: 10, borderRadius: 8, marginBottom: 15 },
  errorText: { color: '#ff4444', marginLeft: 8, fontSize: 14 },
  registerButton: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  registerButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { color: '#666', fontSize: 14 },
  loginLink: { color: '#2ecc71', fontSize: 14, fontWeight: 'bold' },
});
