import { StyleSheet, View, Image ,Text} from "react-native";
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
import About from "./About";

const Home = ({ navigation }) => {

  // const navigation = useNavigation(); // Use navigation hook

  // Shared values for animation
  const outerScale = useSharedValue(1);
  const middleScale = useSharedValue(1);

  // Animate rings
  React.useEffect(() => {
    // Start animation
    outerScale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true); // Pulsing animation
    middleScale.value = withRepeat(withTiming(1.1, { duration: 1000 }), -1, true);

    // Stop animation after 3 seconds and navigate
    const timer = setTimeout(() => {
      navigation.navigate("about"); // Replace 'NextPage' with your target screen name
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Animated styles
  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: outerScale.value }],
  }));

  const middleRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: middleScale.value }],
  }));

  return (

    <View style={styles.container}>
      <StatusBar style="light"/>
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
}

  


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
export default Home