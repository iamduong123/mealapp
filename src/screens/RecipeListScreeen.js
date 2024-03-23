import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import Button from '../components/Button'
export default function MealList({ navigation, route }) {
  const data = route.params.data;
  const category=CATEGORIES.find((cat) => cat.id === data);
  const meal =[];
  MEALS.map((meals) => {
      meals.categoryIds.map((categoryId)=>
        {if(categoryId===data) meal.push(meals)}
      )
  })
  
  return (
    <View style={[styles.container, {backgroundColor:category.color}]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATEGORY</Text>
        <Text style={styles.headerText}>{category.title}</Text>
      </View>
      <View style={styles.content}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {meal.map((meals)=>{
           return (
            <View key={meals.id} style={styles.mealContainer}>
              <Button onPress={()=>navigation.navigate('Meal Details',{data:meals})} title={meals.title} imageUrl={meals.imageUrl} style={styles}>
              </Button>
            </View>
           )
        })}
      
      </ScrollView>
      </View>
     
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  headerText:{
    fontWeight:'bold',
    fontSize:30
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