import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true); // Set loading to true before the API call
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      // Filter out the "Beef" category
      const filteredCategories = response.data.categories.filter(
        (category) => category.strCategory !== "Beef"
      );

      setCategories(filteredCategories);

      if (filteredCategories.length > 0) {
        setSelectedCategory(filteredCategories[0].strCategory); // Set default category
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      Alert.alert("Error", "There was a problem fetching categories. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const renderCategory = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          item.strCategory === selectedCategory && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(item.strCategory)}
      >
        <Text
          style={[
            styles.categoryText,
            item.strCategory === selectedCategory && styles.selectedText,
          ]}
        >
          {item.strCategory}
        </Text>
      </TouchableOpacity>
    ),
    [selectedCategory, setSelectedCategory]
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF6347" /> // Display loader while fetching categories
      ) : (
        <FlatList
          data={categories}
          horizontal
          renderItem={renderCategory}
          keyExtractor={(item) => item.idCategory}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("2%"),
    paddingHorizontal: wp("3%"),
  },
  categoryItem: {
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("1.5%"),
    marginHorizontal: wp("3%"),
    backgroundColor: "#F0F0F0",
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // Adding shadow to category item
  },
  selectedCategory: {
    backgroundColor: "#FF6347", // Highlight selected category
    elevation: 5, // Adding shadow to selected item
  },
  categoryText: {
    fontSize: wp("4.5%"),
    color: "#555",
    textAlign: "center", // Ensure the text is centered
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Categories;
