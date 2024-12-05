import { StyleSheet, View, Image, Text } from "react-native";
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig"; // Make sure you have the firebase config

const Home = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to track the login status

  // Shared values for animation
  const outerScale = useSharedValue(1);
  const middleScale = useSharedValue(1);

  // Firebase listener to check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true); // If user is logged in, update the state
      } else {
        setIsLoggedIn(false); // If no user, update the state
      }
    });

    return unsubscribe; // Cleanup listener
  }, []);

  // Animate rings
  useEffect(() => {
    // Start animation
    outerScale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true); // Pulsing animation
    middleScale.value = withRepeat(withTiming(1.1, { duration: 1000 }), -1, true);

    // Stop animation after 4 seconds and navigate based on login status
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.navigate("About"); // Navigate to About if user is logged in
      } else {
        navigation.navigate("Login"); // Navigate to Login if user is not logged in
      }
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [isLoggedIn]);

  // Animated styles for the rings
  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: outerScale.value }], // Apply scale transformation
  }));

  const middleRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: middleScale.value }], // Apply scale transformation
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Outer Ring */}
      <Animated.View style={[styles.outerRing, outerRingStyle]}>
        {/* Animated Middle Ring */}
        <Animated.View style={[styles.middleRing, middleRingStyle]}>
          {/* Center Image */}
          <Image
            source={{ uri: "https://via.placeholder.com/150" }} // Replace with your image URL
            style={styles.image}
          />
        </Animated.View>
      </Animated.View>

      {/* Text Section */}
      <Text style={styles.title}>Foody</Text>
      <Text style={styles.subtitle}>Food is always right</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2B48C", // Light brown background
    justifyContent: "center",
    alignItems: "center",
  },
  outerRing: {
    width: wp("50%"), // Outer ring width
    height: wp("50%"), // Outer ring height
    borderRadius: wp("25%"), // Half of width/height for round shape
    backgroundColor: "#FFD700", // Gold color for the outer ring
    justifyContent: "center",
    alignItems: "center",
  },
  middleRing: {
    width: wp("42%"), // Middle ring width
    height: wp("42%"), // Middle ring height
    borderRadius: wp("21%"), // Half of width/height for round shape
    backgroundColor: "#FFFFFF", // White color for the middle ring
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp("35%"), // Center image width
    height: wp("35%"), // Center image height
    borderRadius: wp("17.5%"), // Half of width/height for round shape
  },
  title: {
    color: "#FFFFFF", // White text color
    fontSize: wp("8%"), // Large font size
    fontWeight: "bold", // Bold font
    marginTop: wp("35%"), // Add space between the rings and the title
    textAlign: "center", // Center align
  },
  subtitle: {
    color: "#FFFFFF", // White text color
    fontSize: wp("4%"), // Smaller font size for the tagline
    marginTop: wp("2%"), // Space between title and subtitle
    textAlign: "center", // Center align
    fontStyle: "italic", // Italic style for the tagline
  },
});

export default Home;
