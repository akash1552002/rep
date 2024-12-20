// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebaseConfig";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"; // Import responsive screen
// import { CommonActions } from "@react-navigation/native";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       // Use the user's displayName or fallback to the default "Akash"
//       const userName = user.displayName || "Akash";
  
//        Alert.alert("Success", "Logged in successfully!");
  
//     //   // Pass the username to the About component
//     //   navigation.navigate("About", { userName });
//     // } catch (error) {
//     //   Alert.alert("Error", error.message);
//     // }
//     navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: "About", params: { userName } }],
//         })
//       );
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Log In" onPress={handleLogin} />
//       <Text
//         style={styles.link}
//         onPress={() => navigation.navigate("Signup")}
//       >
//         Don't have an account? Sign up
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: wp("5%"), // Use responsive padding
//     backgroundColor: "#F9F9F9",
//   },
//   input: {
//     borderWidth: 1,
//     padding: wp("3%"), // Adjust padding to be responsive
//     marginVertical: hp("2%"), // Adjust margin to be responsive
//     borderRadius: 5,
//     borderColor: "#ccc",
//     fontSize: wp("4%"), // Responsive font size
//   },
//   link: {
//     marginTop: hp("3%"), // Adjust margin to be responsive
//     color: "blue",
//     textAlign: "center",
//     fontSize: wp("4%"), // Responsive font size for link
//   },
// });
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CommonActions } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the username (displayName) and email from Firebase user object
      const userName = user.displayName || "Akash"; // Default username if not set
      const userEmail = user.email; // Get email directly from the user object

      Alert.alert("Success", "Logged in successfully!");

      // Navigate to Profile screen and pass userName and userEmail as params
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Profile", params: { userName, userEmail } }],
        })
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Log In" onPress={handleLogin} />
      )}
      
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Signup")}
      >
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
  },
  link: {
    marginTop: hp("3%"),
    color: "blue",
    textAlign: "center",
    fontSize: wp("4%"),
  },
});
