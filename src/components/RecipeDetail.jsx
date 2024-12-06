import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity, SafeAreaView } from "react-native";
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

  const renderInstructions = (instructions) => {
    return instructions.split("\r\n").map((step, index) => (
      <View key={index} style={styles.instructionStep}>
        <Text style={styles.instructionStepText}>{`${index + 1}. ${step}`}</Text>
      </View>
    ));
  };

  if (!recipeDetail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.instructionsContainer}>
            {renderInstructions(recipeDetail.strInstructions)}
          </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    marginTop:hp("5%"),
    marginBottom: hp("3%"),
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
    borderRadius: wp("3%"),
    borderWidth: 2,
    borderColor: "#ddd", // Adds a subtle border to the image
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recipeTitle: {
    fontSize: wp("6.5%"),
    fontWeight: "bold",
    marginTop: hp("2%"),
    textAlign: "center",
    color: "#333",
    textTransform: "capitalize",
  },
  detailsContainer: {
    marginTop: hp("3%"),
  },
  subtitle: {
    fontSize: wp("4.2%"),
    color: "#555",
    marginVertical: hp("1.5%"),
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginTop: hp("2%"),
    color: "#FF6347", // A fresh color to highlight sections
  },
  ingredientText: {
    fontSize: wp("4.2%"),
    color: "#333",
    marginVertical: hp("0.7%"),
    lineHeight: 22,
    fontWeight: "400",
  },
  instructionsContainer: {
    marginTop: hp("1.5%"),
  },
  instructionStep: {
    marginVertical: hp("1%"),
    padding: wp("2%"),
    backgroundColor: "#f8f8f8",
    borderRadius: wp("2%"),
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  instructionStepText: {
    fontSize: wp("4.2%"),
    color: "#333",
    lineHeight: 24,
  },
  videoLink: {
    marginTop: hp("3%"),
    backgroundColor: "#FF6347", // Tomato color
    paddingVertical: hp("1.5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  videoLinkText: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: hp("3%"), // Adjust padding to ensure content isn't cut off at the bottom
  },
});

export default RecipeDetail;
