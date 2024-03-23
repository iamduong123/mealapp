import React from "react";
import { View, Text, Image } from "react-native";

export default function RecipeCard({ meal }) {
  return (
    <View key={meal.idMeal} className="flex-row items-center mx-4 my-2 p-4 border rounded-xl">
      <Image
        source={{ uri: meal.strMealThumb }}
        style={{
          width: 100,
          height: 100,
          resizeMode: "cover",
          marginRight: 20,
        }}
      />
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{meal.strMeal}</Text>
        <Text>{meal.strCategory}</Text>
      </View>
    </View>
  );
}
