import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/Categories";
import axios from "axios";
import Button from "../components/Button";

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

      <SafeAreaView>
        {/* Button to navigate to FavoriteScreen */}
        

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

          <Button onPress={navigateToFavoriteScreen} />
          {/* Categories */}
          <View>
            {categories.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
            )}
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
