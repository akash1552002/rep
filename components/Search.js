import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Search = ({ searchQuery, setSearchQuery, placeholder = "Search..." }) => {
  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder} // Default placeholder with customization
        value={searchQuery}
        onChangeText={setSearchQuery} // Update the search query state
        placeholderTextColor="#999" // Subtle placeholder color
        returnKeyType="search" // Set the return key type for better UX
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default Search;
