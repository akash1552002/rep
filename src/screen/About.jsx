import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Catagories from "../components/Catagories";
import Recipe from "../components/Recipe";
import { useRoute, useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";

const About = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const { userName } = route.params || {};
  const { userName: paramUserName } = route.params || {}
  //profile image
  const { userName, profileImage } = route.params || {};

  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayName, setDisplayName] = useState(paramUserName || "User");

  useEffect(() => {
    if (!paramUserName) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setDisplayName(currentUser.displayName || "User");
      } else {
        console.warn("No userName provided and no current user found.");
      }
    }
  }, [paramUserName]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="black" />
      {/* Top Header Section */}
      <View style={styles.header}>
        {/* Circular Logo Section */}
        <View style={styles.imageCircle}>
          <Image
            source={require("../../assets/file.png")} // Replace with your logo image
            style={styles.circularLogo}
          />
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate("Profile", { userName })}> */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Profile", { userName: displayName })}>

          <UserCircleIcon size={hp("6%")} color="#000" />
        </TouchableOpacity> */}
        {/* Profile Image Section */}
        <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => navigation.navigate("Profile", { userName, profileImage })}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <UserCircleIcon size={hp("6%")} color="#000" marginTop={hp("0%")}/> // Default profile icon
        )}
      </TouchableOpacity>
      </View>

      {/* Greeting Section */}
      <View style={styles.greeting}>
      {/* <Text style={styles.helloText}>Hello, {displayName}</Text> */}
      <Text style={styles.helloText}>Hello, {displayName}</Text>

        <Text style={styles.subtitleText}>
          Make your own food, stay at home
        </Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes or food..."
        />
      </View>

      {/* Categories Section */}
      <Catagories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Recipes Section */}
      <Recipe selectedCategory={selectedCategory} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("9%"),
    paddingVertical: hp("1%"),
  },
  imageCircle: {
    width: hp("6%"),
    height: hp("6%"),
    borderRadius: hp("3%"), // Makes the container a perfect circle
    overflow: "hidden", // Ensures the logo stays within the circle
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Optional background
    // marginTop:hp("1%")
  },
  circularLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensures the logo is properly scaled inside the circle
  },
  greeting: {
    marginTop: wp("5%"),
    marginLeft: wp("7%"),
  },
  helloText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#000",
  },
  subtitleText: {
    fontSize: wp("4%"),
    color: "#555",
    marginTop: hp("0.5%"),
  },
  searchSection: {
    alignItems: "center",
    marginVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  searchInput: {
    width: "100%",
    height: hp("6%"),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: wp("3%"),
    fontSize: wp("4%"),
  },
});

export default About;
