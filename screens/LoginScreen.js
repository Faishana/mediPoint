import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput as PaperInput } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const login = async () => {
    setIsLoading(true);

    // Check if fields are empty
    if (!username || !password) {
      setMsg("Please fill all fields");
      setIsLoading(false);
      return;
    }

    setTimeout(async () => {
      const data = await AsyncStorage.getItem("user");
      if (!data) {
        setMsg("No user found. Please register first.");
        setIsLoading(false);
        return;
      }

      const user = JSON.parse(data);
      if (username === user.username && password === user.password) {
        setIsLoading(false);
        navigation.replace("Main");
      } else {
        setMsg("Invalid username or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Brand Header */}
          <View style={styles.brandContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>MediPoint</Text>
            <Text style={styles.tagline}>Secure Medical Login</Text>
          </View>

          
          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login to Your Account</Text>

            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <PaperInput
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (msg) setMsg(""); // Clear error when typing
                }}
                mode="outlined"
                left={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons name="person" size={20} color="#2ecc71" />
                    )}
                  />
                }
                style={styles.input}
                theme={{
                  colors: {
                    primary: "#2ecc71",
                    background: "#f9fafb",
                    outline: "#e1e5e9",
                    text: "#333",
                    placeholder: "#999",
                  },
                  roundness: 10,
                }}
                outlineColor="#e1e5e9"
                activeOutlineColor="#2ecc71"
                autoCapitalize="none"
                placeholder="Enter your username"
                placeholderTextColor="#999"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.passwordHeader}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <PaperInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (msg) setMsg(""); // Clear error when typing
                }}
                secureTextEntry={!showPassword}
                mode="outlined"
                left={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons name="lock-closed" size={20} color="#2ecc71" />
                    )}
                  />
                }
                right={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={20}
                        color="#2ecc71"
                      />
                    )}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
                theme={{
                  colors: {
                    primary: "#2ecc71",
                    background: "#f9fafb",
                    outline: "#e1e5e9",
                    text: "#333",
                    placeholder: "#999",
                  },
                  roundness: 10,
                }}
                outlineColor="#e1e5e9"
                activeOutlineColor="#2ecc71"
                placeholder="Enter your password"
                placeholderTextColor="#999"
              />
            </View>

            {/* Remember Me & Error Message */}
            <View style={styles.rememberContainer}>
              <TouchableOpacity
                style={styles.rememberCheckbox}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>

              {msg ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={16} color="#d32f2f" />
                  <Text style={styles.error}>{msg}</Text>
                </View>
              ) : null}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                (!username || !password || isLoading) && styles.buttonDisabled,
              ]}
              onPress={login}
              disabled={!username || !password || isLoading}
              activeOpacity={0.9}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons
                    name="refresh"
                    size={20}
                    color="#fff"
                    style={styles.spinning}
                  />
                  <Text style={styles.buttonText}>Logging in...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Alternative Login Options */}
            <View style={styles.alternativeContainer}>
              <Text style={styles.alternativeText}>Login with</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By logging in, you agree to our{" "}
                <Text style={styles.footerLink}>Terms</Text> and{" "}
                <Text style={styles.footerLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  brandContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  logoContainer: {
    marginTop: 40,
    width: 90,
    height: 30,
    borderRadius: 20, // Slightly rounded corners
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  logoImage: {
    width: "100%",
    height: 100,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2ecc71",
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: "#666",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff", // Important for shadow visibility
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 25,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 5,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#2ecc71",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  rememberContainer: {
    marginBottom: 20,
  },
  rememberCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#2ecc71",
    borderColor: "#2ecc71",
  },
  rememberText: {
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  error: {
    color: "#d32f2f",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    backgroundColor: "#2ecc71",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#b0e0c8",
    elevation: 0,
    shadowOpacity: 0,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  spinning: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e1e5e9",
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: "#999",
  },
  alternativeContainer: {
    marginBottom: 25,
  },
  alternativeText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e1e5e9",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  registerText: {
    fontSize: 15,
    color: "#666",
  },
  registerLink: {
    fontSize: 15,
    color: "#2ecc71",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    color: "#2ecc71",
    fontWeight: "500",
  },
});
