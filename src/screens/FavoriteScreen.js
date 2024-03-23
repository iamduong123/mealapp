import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { CATEGORIES } from '../data/dummy-data';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from AsyncStorage or other storage mechanism
    // For simplicity, we'll use a dummy data for demonstration purposes
    // Replace this with your actual implementation to load favorites
    const storedFavorites = [
      {
        id: '1',
        title: 'Favorite Meal 1',
        categoryIds: ['c1'],
        isFavorite: true,
      },
      {
        id: '2',
        title: 'Favorite Meal 2',
        categoryIds: ['c2'],
        isFavorite: true,
      },
    ];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (mealId) => {
    // Toggle favorite status for the selected meal
    const updatedFavorites = favorites.map((meal) =>
      meal.id === mealId ? { ...meal, isFavorite: !meal.isFavorite } : meal
    );
    setFavorites(updatedFavorites);

    // Save updated favorites to AsyncStorage or other storage mechanism
    // For simplicity, we'll not implement saving favorites in this example
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <ScrollView>
        {favorites.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.mealContainer}
            onPress={() => navigation.navigate('Meal Details', { mealId: meal.id })}
          >
            <Text>{meal.title}</Text>
            <View style={styles.favoriteIcon}>
              <Entypo
                name={meal.isFavorite ? 'heart' : 'heart-outlined'}
                size={24}
                color={meal.isFavorite ? 'red' : 'black'}
                onPress={() => toggleFavorite(meal.id)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  favoriteIcon: {
    padding: 5,
  },
});

export default FavoriteScreen;
