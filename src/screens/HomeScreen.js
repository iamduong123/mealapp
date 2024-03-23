import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/Categories";
import { CATEGORIES } from "../data/dummy-data"; // Importing the CATEGORIES array
import Button from "../components/Button";

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]); // Initialize with the first category

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    navigation.navigate('RecipeList', { category });
  };

  const navigateToFavoriteScreen = () => {
    navigation.navigate('Favorite');
  };

  return (
    <View style={{ backgroundColor: "#f64e32", flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Image
        source={require("../assets/images/background.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
      <StatusBar style="dark" />

      {/* Button to navigate to FavoriteScreen */}
      <TouchableOpacity onPress={navigateToFavoriteScreen}>
        <Button>Go to Favorites</Button>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 20,
        }}
      >
        {/* Headlines */}
        <View style={{ marginLeft: 20, marginVertical: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#333' }}>Fast & Delicious</Text>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#333' }}>Food You <Text style={{ color: 'purple' }}>Love</Text></Text>
        </View>

        {/* Categories */}
        <Categories
          categories={CATEGORIES}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </ScrollView>
    </View>
  );
}
