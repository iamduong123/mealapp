import React, { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import RecipeCard from "../components/RecipesCard";
import { MEALS } from "../data/dummy-data"; // Importing the MEALS array
import { useNavigation } from '@react-navigation/native';

export default function RecipeListScreen({ route }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getRecipes(category.id); // Pass the category id for filtering
  }, [category]);

  const getRecipes = (categoryId) => {
    // Filter meals based on the category id
    const filteredMeals = MEALS.filter((meal) => meal.categoryIds.includes(categoryId));
    setMeals(filteredMeals);
  };

  const handleRecipePress = (mealId) => {
    navigation.navigate('RecipeDetails', { mealId });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Render Meals using RecipeCard component */}
          <View>
            {meals.map((meal) => (
              <TouchableOpacity key={meal.id} onPress={() => handleRecipePress(meal.id)}>
                <RecipeCard meal={meal} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
