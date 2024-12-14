import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

const Loader = ({ navigation, route }) => {
  const { isLoggedIn } = route.params || {}; // Get login status from navigation params (with fallback)

  useEffect(() => {
    // Navigate after a brief delay
    const timer = setTimeout(() => {
      if (isLoggedIn === undefined) {
        console.error("Login status is undefined, redirecting to Login page.");
        navigation.navigate("Login"); // Default to login if status is unclear
      } else if (isLoggedIn) {
        navigation.navigate("About"); // Navigate to About if logged in
      } else {
        navigation.navigate("Login"); // Navigate to Login if not logged in
      }
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>Please wait while we check your status...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2", // Blue background
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Adding some padding for a better layout
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center", // Ensure the text is centered
  },
});

export default Loader;
