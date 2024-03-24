import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/Categories";
import { CATEGORIES } from "../data/dummy-data"; 
import FavoriteButton from "../components/FavoriteButton";

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]); 

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    navigation.navigate('RecipeList', { category });
  };

  const navigateToFavoriteScreen = () => {
    navigation.navigate('Favorite');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <StatusBar style="dark" />

      {/* FavoriteButton to navigate to FavoriteScreen */}
        <FavoriteButton onPress={navigateToFavoriteScreen} style={styles.FavoriteButtonContainer}>Go to Favorites</FavoriteButton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Headlines */}
        <View style={styles.headlineContainer}>
          <Text style={styles.headlineText}>Fast & Delicious</Text>
          <Text style={[styles.headlineText, styles.highlightedText]}>Food You <Text style={{ color: 'purple' }}>Love</Text></Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f64e32",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  FavoriteButtonContainer: {
    width: '100%', 
    
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  scrollViewContent: {
    paddingBottom: 50,
    paddingTop: 20
  },
  headlineContainer: {
    marginLeft: width * 0.05, // Adjusted for responsive layout
    marginVertical: height * 0.03, // Adjusted for responsive layout
  },
  headlineText: {
    fontSize: width * 0.08, // Adjusted for responsive font size
    fontWeight: 'bold',
    color: '#333'
  },
  highlightedText: {
    fontSize: width * 0.1, // Adjusted for responsive font size
  }
});

export default HomeScreen;
