import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    >
      {categories.map((category) => {
        let isActive = category === activeCategory;
        let activeButtonStyle = isActive ? styles.activeCategoryButton : null;

        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleChangeCategory(category)}
            style={{ alignItems: "center", marginBottom: 10 }}
          >
            <ImageBackground
              source={{ uri: category.image }} l
              style={[styles.categoryButton, activeButtonStyle]}
              imageStyle={styles.categoryImage}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </ImageBackground>
            <Text style={styles.additionalText}>{category.title}</Text>
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((cat) => (
                <Text key={cat.id} style={styles.categoryItem}>{cat.name}</Text>
              ))}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    width: "100%",
    aspectRatio: 2, // Adjust the aspect ratio as needed
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    overflow: "hidden",
  },
  activeCategoryButton: {
    backgroundColor: "black",
  },
  categoryImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  categoryText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  additionalText: {
    fontSize: 20,
    color: "#333",
    marginTop: 5,
  },
  categoriesContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryItem: {
    marginHorizontal: 5,
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});
