import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { CATEGORIES } from '../data/dummy-data';
import FavoriteButton from '../components/FavoriteButton';

export default function Favorites({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }

    loadFavorites();
  }, []);

  const toggleFavorite = async (meal) => {
    try {
      const updatedFavorites = [...favorites];
      const index = updatedFavorites.findIndex((favMeal) => favMeal.id === meal.id);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.header}>
            <Text>Seems like you have not found anything interesting yet!</Text>
            <TouchableOpacity
              style={[styles.customButton, { backgroundColor: 'grey', borderRadius: 10, padding: 10 }]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>FAVORITES</Text>
        </View>
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {favorites.map((meal) => (
              <View key={meal.id} style={styles.mealContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RecipeDetails', { mealId: meal.id })}
                >
                  <ImageBackground
                    source={{ uri: meal.imageUrl }}
                    style={styles.backgroundImage}
                    imageStyle={{ borderRadius: 10 }}
                  >
                    <View style={styles.overlay} />
                    <FavoriteButton onPress={() => navigation.navigate('RecipeDetails', { mealId: meal.id })}
                     text={meal.title} />
                    <View style={styles.category}>
                      <View style={styles.cat}>
                        {meal.categoryIds.map((categoryId) => {
                          const category = CATEGORIES.find(cat => cat.id === categoryId);
                          if (!category) return null;

                          return (
                            <TouchableOpacity
                              key={category.id}
                              style={[styles.categoryContainer, { backgroundColor: category.color }]}
                              onPress={() => navigation.navigate('RecipeList', { category })}
                            >
                              <Text>{category.title}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(meal)}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Entypo name={'heart'} size={24} color={'red'} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  customButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f64e32',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 3,
  },
  mealContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden', // Ensure content doesn't overflow rounded corners
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 10,
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    position: 'absolute', // Position the favorite button absolutely
    bottom: 10,
    right: 10,
  },
  cat: {
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
  },
  categoryContainer: {
    borderRadius: 20,
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    borderRadius: 10,
  },
});
