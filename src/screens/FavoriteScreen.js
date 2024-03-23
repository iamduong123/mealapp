import { favorites } from "../data/favorites";
import React from "react";
import Button from "../components/Button";

import { ScrollView, StyleSheet, Text, View } from "react-native";
export default function FavoritesScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Favorites</Text> */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {favorites.map((meal) => {
            return (
                <View key={meal} style={styles.mealContainer}>
                <Button
                    onPress={() => navigation.navigate("Meal Details", { data: meal })}
                    title={meal.title}
                    imageUrl={meal.imageUrl}
                    style={styles}
                ></Button>
                </View>
            );
            })}
            </ScrollView>
    </View>
  );
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
    },
    content:{
        flex:3,
      },
    
      scrollViewContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
      },
      mealContainer: {
        width: "48%", // Adjust the width to accommodate two items in a row
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
        padding:10
      },
      image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
      },
    });