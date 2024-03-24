import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MEALS } from "../data/dummy-data";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import CustomText from "../components/CustomText";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecipeDetailsScreen({ route, navigation }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const loadMeal = async () => {
      const selectedMeal = MEALS.find((meal) => meal.id === mealId);
      if (selectedMeal) {
        setMeal(selectedMeal);
        setIsLoading(false);
      } else {
        console.log("Meal not found!");
      }
    };

    const loadFavouriteStatus = async () => {
      // Load the favorite status from AsyncStorage or any other storage mechanism
      // For simplicity, let's assume AsyncStorage
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites);
          const isFav = favorites.some((fav) => fav.id === mealId);
          setIsFavourite(isFav);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadMeal();
    loadFavouriteStatus();
  }, [mealId]);

  const toggleFavorite = async () => {
    try {
      // Update the favorite status locally
      setIsFavourite(!isFavourite);

      // Update the favorite status in AsyncStorage or any other storage mechanism
      // For simplicity, let's assume AsyncStorage
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = [];
      if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
      }
      const existingIndex = favorites.findIndex((fav) => fav.id === mealId);
      if (existingIndex !== -1) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
      } else {
        // Add to favorites
        favorites.push(meal);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <StatusBar style="white" />

      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color={"#f64e32"} strokeWidth={2} />
        </TouchableOpacity>
        {/* Heart icon for favorite */}
        <TouchableOpacity onPress={toggleFavorite}>
          <HeartIcon size={24} color={isFavourite ? "#f64e32" : "gray"} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Recipe Image */}
      <Image
        source={{ uri: meal ? meal.imageUrl : null }}
        style={{ width: "100%", height: 250 }}
      />

      {isLoading ? (
        <Loading size="large" style={{ marginTop: 150 }} />
      ) : (
        <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "white", paddingHorizontal: 20, paddingTop: 20 }}>
          {/* Meal Name */}
          <CustomText style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>{meal ? meal.title : "Meal not found"}</CustomText>
          {/* Description */}
          <CustomText >Duration: {meal.duration}m</CustomText>
          <CustomText >Difficulty: {meal.complexity}</CustomText>
          <CustomText >Gluten Free?: {meal.isGlutenFree ? "Yes" : "No"}</CustomText>
          <CustomText >Is it vegan?: {meal.isVegan ? "Yes" : "No"}</CustomText>
          <CustomText >Is it for vegetarian?: {meal.isVegetarian ? "Yes" : "No"}</CustomText>
          <CustomText >Is it lactose free?: {meal.isLactoseFree ? "Yes" : "No"}</CustomText>

          {/* Ingredients */}
          <CustomText style={{ fontSize: 20, fontWeight: "bold", color: "#333", marginTop: 20 }}>Ingredients</CustomText>
          <View style={{ marginTop: 10 }}>
            {meal.ingredients.map((ingredient, index) => (
              <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#f64e32", marginRight: 10 }} />
                <CustomText style={{ fontSize: 16, color: "#666" }}>{ingredient}</CustomText>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <CustomText style={{ fontSize: 20, fontWeight: "bold", color: "#333", marginTop: 20 }}>Instructions</CustomText>
          <CustomText style={{ fontSize: 16, color: "#666", marginTop: 10 }}>{meal ? meal.steps : "Instructions not found"}</CustomText>
        </View>
      )}
    </ScrollView>
  );
}
