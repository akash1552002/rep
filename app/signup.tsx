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
  ActivityIndicator,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  About: { userName: string };
  Login: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

export default function Search({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (): Promise<void> => {
    if (!email || !password || !username) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: User = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("About", { userName: username });
    } catch (error: any) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Error",
          "This email is already in use. Please try another."
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
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

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
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
    marginTop: hp("2%"),
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
