import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Category {
  idCategory: string;
  strCategory: string;
}

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      const filteredCategories = response.data.categories.filter(
        (category: Category) => category.strCategory !== "Beef"
      );

      setCategories(filteredCategories);

      if (filteredCategories.length > 0) {
        setSelectedCategory(filteredCategories[0].strCategory);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      Alert.alert(
        "Error",
        "There was a problem fetching categories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
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
        <ActivityIndicator size="large" color="#FF6347" />
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
}

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
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: "#FF6347",
    elevation: 5,
  },
  categoryText: {
    fontSize: wp("4.5%"),
    color: "#555",
    textAlign: "center",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
