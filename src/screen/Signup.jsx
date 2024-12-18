import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New state for username

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update user profile with username
      await updateProfile(user, {
        displayName: username,
      });
  
      Alert.alert("Success", "Account created!");
  
      // Pass the username to the About component
      navigation.navigate("About", { userName: username });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.link}>
          Already have an account?{" "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("1%"),
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: hp("3%"),
  },
  input: {
    width: wp("90%"),
    height: hp("7%"),
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: wp("2%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("2%"),
    fontSize: wp("4%"),
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: hp("2%"),
    borderRadius: wp("2%"),
    width: wp("90%"),
    alignItems: "center",
    marginTop: hp("1%"),
  },
  buttonText: {
    color: "#FFF",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
  link: {
    fontSize: wp("3.5%"),
    color: "#555",
    marginTop: hp("2%"),
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
