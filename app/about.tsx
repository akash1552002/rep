import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircleIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Categories from "./components/categories";
import Recipe from "./components/recipe";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  About: {
    userName?: string;
    profileImage?: string;
  };
  Profile: {
    userName: string;
    profileImage?: string;
  };
};

type AboutRouteProp = RouteProp<RootStackParamList, "About">;
type ProfileNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

export default function About() {
  const navigation = useNavigation<ProfileNavigationProp>();
  const route = useRoute<AboutRouteProp>();
  const { userName: paramUserName, profileImage } = route.params || {};

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>(
    paramUserName || "User"
  );

  useEffect(() => {
    if (!paramUserName) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setDisplayName(currentUser.displayName || "User");
      }
    }
  }, [paramUserName]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={() =>
            navigation.navigate("Profile", {
              userName: displayName,
              profileImage,
            })
          }
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <UserCircleIcon size={hp("6%")} color="#000" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.greeting}>
        <Text style={styles.helloText}>Hello, {displayName}</Text>
        <Text style={styles.subtitleText}>
          Make your own food, stay at home
        </Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes or food..."
        />
      </View>

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Recipe selectedCategory={selectedCategory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  profileImage: {
    width: hp("12%"),
    height: hp("12%"),
    borderRadius: hp("6%"),
    borderWidth: 2,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp("2%"),
  },
  greeting: {
    marginTop: hp("2%"),
    marginLeft: wp("5%"),
  },
  helloText: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "#333",
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
    backgroundColor: "#FFF",
  },
});
