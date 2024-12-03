import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const RecipeDetail = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetail();
    }
  }, [recipeId]);

  const fetchRecipeDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );
      setRecipeDetail(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe detail:", error);
    }
  };

  const renderIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    return ingredients;
  };

  if (!recipeDetail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={{ uri: recipeDetail.strMealThumb }}
          style={styles.recipeImage}
        />
        <Text style={styles.recipeTitle}>{recipeDetail.strMeal}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Cooking Time: {recipeDetail.strCookTime || 'N/A'}</Text>
          <Text style={styles.subtitle}>Category: {recipeDetail.strCategory}</Text>
          <Text style={styles.subtitle}>Cuisine: {recipeDetail.strArea}</Text>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {renderIngredients(recipeDetail).map((ingredient, index) => (
            <Text key={index} style={styles.ingredientText}>{ingredient}</Text>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionText}>{recipeDetail.strInstructions}</Text>

          {recipeDetail.strYoutube && (
            <TouchableOpacity
              style={styles.videoLink}
              onPress={() => Linking.openURL(recipeDetail.strYoutube)}
            >
              <Text style={styles.videoLinkText}>Watch Cooking Video</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    marginBottom:hp("3%"),

    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeImage: {
    width: "100%",
    height: hp("40%"),
    borderRadius: wp("2%"),
  },
  recipeTitle: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    marginTop: hp("2%"),
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: hp("3%"),
  },
  subtitle: {
    fontSize: wp("4%"),
    color: "#555",
    marginVertical: hp("1%"),
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginTop: hp("2%"),
  },
  ingredientText: {
    fontSize: wp("4%"),
    color: "#333",
    marginVertical: hp("0.5%"),
  },
  instructionText: {
    fontSize: wp("4%"),
    color: "#333",
    marginVertical: hp("1%"),
  },
  videoLink: {
    marginTop: hp("2%"),
    backgroundColor: "#FF6347",
    paddingVertical: hp("1%"),
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  videoLinkText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: hp("3%"), // Adjust padding to ensure content isn't cut off at the bottom
  },
});

export default RecipeDetail;
