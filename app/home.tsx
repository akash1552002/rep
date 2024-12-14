import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View,StyleSheet, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { auth } from "../firebaseConfig";
import logo from "../assets/images/logo.png"

interface Props {
  navigation: NavigationProp<any>;
}


export default function Home({ navigation }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Shared values for animations
  const bounceValue = useSharedValue(0);
  const textScale = useSharedValue(1);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((user:any) => {
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Image bounce animation
    bounceValue.value = withRepeat(
      withTiming(-80, { duration: 1000 }),
      -1,
      true
    );

    // Text pulsing animation
    textScale.value = withRepeat(
      withTiming(1.3, { duration: 1000 }),
      -1,
      true
    );

    // Navigate after 4 seconds based on login state
    const timer = setTimeout(() => {
      navigation.navigate("Loader", { isLoggedIn });
    }, 4000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigation, bounceValue, textScale]);

  // Animated styles
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }],
  }));


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <Animated.Image source={logo} style={[styles.image, animatedImageStyle]} />
      <Animated.Text style={[styles.title, animatedTextStyle]}>Foody</Animated.Text>
      <Animated.Text style={[styles.subtitle, animatedTextStyle]}>
        Food is always right
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2B48C",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp("50%"),
    height: wp("50%"),
    borderRadius: wp("25%"),
    marginBottom: wp("5%"),
  },
  title: {
    color: "#FFFFFF",
    fontSize: wp("7%"),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: wp("5%"),
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: wp("4%"),
    marginTop: wp("2%"),
    textAlign: "center",
    fontStyle: "italic",
  },
});