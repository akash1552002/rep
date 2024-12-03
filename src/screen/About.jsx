import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Catagories from "../components/Catagories";
import Recipe from "../components/Recipe";
import { StatusBar } from "expo-status-bar";

const About = (navigation ) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="black"/>
      {/* Top Header Section */}
      <View style={styles.header}>
        {/* Profile Section */}
        <TouchableOpacity>
          <UserCircleIcon size={hp("6%")} color="#000" />
        </TouchableOpacity>

        {/* Notification Section */}
        <TouchableOpacity>
          <BellIcon size={hp("6%")} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Greeting Section */}
      <View style={styles.greeting}>
        <Text style={styles.helloText}>Hello, Name</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
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
