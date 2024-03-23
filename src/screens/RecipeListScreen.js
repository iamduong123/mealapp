import React, { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import axios from "axios";
import RecipeCard from "../components/RecipesCard";

export default function RecipeListScreen({ route }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getRecipes(category);
  }, [category]);

  const getRecipes = async (category) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          className="space-y-6 pt-14"
        >
          {/* Render Meals using MealItem component */}
          <View>
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
