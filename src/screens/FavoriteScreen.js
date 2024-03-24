import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { CATEGORIES } from '../data/dummy-data';

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
        <Image
          source={require("../assets/images/background.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
        <View style={styles.header}>
          <Text>Seems like you have not found anything interesting yet!</Text>
          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: 'grey', borderRadius: 10, padding: 10 }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>FAVORITES</Text>
      </View>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {favorites.map((meal) => (
            <View key={meal.id} style={styles.mealContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RecipeDetails', { mealId: meal.id })}
                style={styles.favoriteButton}
              >
                <Text>{meal.title}</Text>
              </TouchableOpacity>
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
                  <Entypo name={'heart'} size={24} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
  content: {
    flex: 3,
  },
  mealContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row', // Align icon horizontally
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cat: {
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    borderRadius: 20,
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
