import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationProp, RouteProp } from "@react-navigation/native";

interface LoaderProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { isLoggedIn?: boolean } }, "params">;
}

export default function Loader({ navigation, route }: LoaderProps) {
  const { isLoggedIn } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn === undefined) {
        console.error("Login status is undefined, redirecting to Login page.");
        navigation.navigate("Login");
      } else if (isLoggedIn) {
        navigation.navigate("About");
      } else {
        navigation.navigate("Login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigation]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={styles.text}>Please wait while we check your status...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
