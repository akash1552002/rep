import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type RootStackParamList = {
  RecipeDetail: { recipeId: string };
};

type RecipeDetailRouteProp = RouteProp<RootStackParamList, "RecipeDetail">;

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions: string;
  strYoutube?: any;
  strCookTime?: string;
  [key: string]: string | undefined;
}

interface ApiResponse {
  meals: RecipeDetail[] | null;
}

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute<RecipeDetailRouteProp>();
  const { recipeId } = route.params;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const meal = response.data.meals?.[0] || null;
        if (meal) {
          setRecipe(meal);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Failed to fetch recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No recipe data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{recipe.strMeal}</Text>
        {recipe.strCategory && (
          <Text style={styles.subtitle}>{recipe.strCategory}</Text>
        )}
        {recipe.strArea && (
          <Text style={styles.subtitle}>{recipe.strArea}</Text>
        )}
        {recipe.strCookTime && (
          <Text style={styles.subtitle}>Cook Time: {recipe.strCookTime}</Text>
        )}
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>

        {recipe.strYoutube && (
          <TouchableOpacity onPress={() => Linking.openURL(recipe.strYoutube)}>
            <Text style={styles.link}>Watch the recipe video on YouTube</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2),
    paddingHorizontal: wp(4),
  },
  scrollView: {
    paddingBottom: hp(2),
  },
  image: {
    width: wp(100),
    height: hp(40),
    borderRadius: 8,
    marginBottom: hp(2),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: hp(1),
  },
  instructions: {
    fontSize: 16,
    marginBottom: hp(2),
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: hp(2),
  },
});
