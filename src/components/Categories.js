import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

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
        let activeButtonStyle = isActive ? { backgroundColor: "black" } : { backgroundColor: "purple" };

        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleChangeCategory(category)}
            style={{ alignItems: "center", marginBottom: 10 }}
          >
            <View style={[styles.categoryButton, activeButtonStyle]}>
              <Image
                source={{ uri: category.image }} // Assuming 'image' property exists in your Category model
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = {
  categoryButton: {
    borderRadius: 50,
    padding: 6,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 20,
    color: "#333",
    marginTop: 5,
  },
};
