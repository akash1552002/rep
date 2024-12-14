import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  navigation: NavigationProp<any>;
}

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Use the user's displayName or fallback to the default "Akash"
      const userName = user.displayName || "Akash";

      Alert.alert("Success", "Logged in successfully!");

      // Reset navigation stack to About screen after login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "About", params: { userName } }],
        })
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />

      <Button
        title={loading ? "Logging In..." : "Log In"}
        onPress={handleLogin}
        disabled={loading}
      />

      {/* Show loader when logging in */}
      {loading && (
        <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
      )}

      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("5%"),
    backgroundColor: "#F9F9F9",
  },
  input: {
    borderWidth: 1,
    padding: wp("3%"),
    marginVertical: hp("2%"),
    borderRadius: 5,
    borderColor: "#ccc",
    fontSize: wp("4%"),
    backgroundColor: "#FFF", // Added background color for the input
  },
  loader: {
    marginTop: hp("2%"),
  },
  link: {
    marginTop: hp("3%"),
    color: "blue",
    textAlign: "center",
    fontSize: wp("4%"),
  },
});
