import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput as PaperInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return false;
    }

    return true;
  };

  const register = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      // Check if user already exists
      const existingUser = await AsyncStorage.getItem("user");
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.username === username || parsedUser.email === email) {
          setError("Username or email already exists");
          setIsLoading(false);
          return;
        }
      }

      // Create new user
      const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        navigation.replace("Login");
      }, 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
      setIsLoading(false);
      console.error("Registration error:", err);
    }
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
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Brand Section */}
          <View style={styles.brandContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>MediPoint</Text>
            <Text style={styles.tagline}>Join our healthcare community</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create your account</Text>

            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <PaperInput
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (error) setError("");
                }}
                mode="outlined"
                left={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#2ecc71"
                      />
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
                placeholder="Choose a username"
                placeholderTextColor="#999"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <PaperInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError("");
                }}
                mode="outlined"
                left={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons name="mail-outline" size={20} color="#2ecc71" />
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
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#999"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <PaperInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error) setError("");
                }}
                secureTextEntry={!showPassword}
                mode="outlined"
                left={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#2ecc71"
                      />
                    )}
                  />
                }
                right={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
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
                placeholder="Create a strong password"
                placeholderTextColor="#999"
              />
              <Text style={styles.passwordHint}>
                Must be at least 6 characters
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <PaperInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (error) setError("");
                }}
                secureTextEntry={!showConfirmPassword}
                mode="outlined"
                left={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#2ecc71"
                      />
                    )}
                  />
                }
                right={
                  <PaperInput.Icon
                    icon={() => (
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color="#2ecc71"
                      />
                    )}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
                placeholder="Confirm your password"
                placeholderTextColor="#999"
              />
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setTermsAccepted(!termsAccepted)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  termsAccepted && styles.checkboxChecked,
                ]}
              >
                {termsAccepted && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={18} color="#d32f2f" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                (!username ||
                  !email ||
                  !password ||
                  !confirmPassword ||
                  !termsAccepted ||
                  isLoading) &&
                  styles.registerButtonDisabled,
              ]}
              onPress={register}
              disabled={
                !username ||
                !email ||
                !password ||
                !confirmPassword ||
                !termsAccepted ||
                isLoading
              }
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
                  <Text style={styles.registerButtonText}>
                    Creating account...
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.registerButtonText}>Create Account</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={22}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Sign Up */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  brandContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  logoContainer: {
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
  formContainer: {
    paddingHorizontal: 25,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "600",
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
  input: {
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  passwordHint: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    marginLeft: 5,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
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
  termsText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: "#2ecc71",
    fontWeight: "500",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "#d32f2f",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  registerButton: {
    backgroundColor: "#2ecc71",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonDisabled: {
    backgroundColor: "#b0e0c8",
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
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginLeft: 8,
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
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 25,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e1e5e9",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    fontSize: 15,
    color: "#666",
  },
  loginLink: {
    fontSize: 15,
    color: "#2ecc71",
    fontWeight: "600",
    marginLeft: 5,
  },
});
