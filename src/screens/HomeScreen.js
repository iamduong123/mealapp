import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Button from "../components/Button";

export default function Home({ navigation, routes }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
      </View>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.categoryContainer}>

            <Button style={styles.category} title={"Favorites"} onPress={() => navigation.navigate('Favorites')}>
            </Button>
            {CATEGORIES.map((category) => (
              <Button key={category.id} style={[styles.category, { backgroundColor: category.color }]} title={category.title} onPress={() => navigation.navigate('Meal List', { data: category.id })}>
              </Button>
            ))}
          </View>

        </ScrollView>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30
  },
  content: {
    flex: 5,
  },
  scrollViewContent: {
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 10,
  },
  category: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    // paddingHorizontal: '25%',
    width: '100%',
    paddingVertical: '25%',
    marginRight: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});