// RecipeCard.js

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const RecipeCard = ({ meal }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{meal.title}</Text>
        <Text style={styles.category}>{meal.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center", 
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center", 
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    color: "#666",
  },
});

export default RecipeCard;
