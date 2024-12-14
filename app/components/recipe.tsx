import React, { useEffect, useState, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  RecipeDetail: { recipeId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "RecipeDetail">;

interface RecipeProps {
  selectedCategory: string | undefined;
}

interface RecipeItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface ApiResponse {
  meals: RecipeItem[] | null;
}

export default function Recipe({ selectedCategory }: RecipeProps) {
  const navigation = useNavigation<NavigationProp>();
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedCategory) {
      fetchRecipes();
    }
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const RecipeCard = memo(({ recipe }: { recipe: any }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() =>
        navigation.navigate("RecipeDetail", { recipeId: recipe.idMeal })
      }
    >
      <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
      <Text style={styles.recipeText}>{recipe.strMeal}</Text>
    </TouchableOpacity>
  ));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.loadingText}>Loading recipes...</Text>
      </View>
    );
  }

  if (!recipes.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No recipes available for {selectedCategory}.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedCategory} Recipes</Text>
      <MasonryList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        numColumns={2}
        contentContainerStyle={styles.masonryContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp("2%"),
    paddingHorizontal: wp("3%"),
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "#2e2e2e",
    marginBottom: hp("2%"),
    textAlign: "center",
  },
  masonryContent: {
    paddingBottom: hp("5%"),
  },
  recipeCard: {
    margin: wp("2%"),
    backgroundColor: "#FFF",
    borderRadius: wp("4%"),
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recipeImage: {
    width: "100%",
    height: hp("20%"),
  },
  recipeText: {
    padding: wp("3%"),
    fontSize: wp("4.5%"),
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: hp("2%"),
    fontSize: wp("4%"),
    color: "#555",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: wp("4.5%"),
    color: "#FF6347",
    fontWeight: "bold",
    textAlign: "center",
  },
});
