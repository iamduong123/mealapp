import React, { useRef } from "react";
import { StatusBar, Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function WelcomeScreen() {
  const animation = useRef(null);
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "#f64e32", flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Image
        source={require("../assets/images/foodBG1.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
      <StatusBar style="light" />

      
      {/* Title and Subtitle */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Food Cafe
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          Explore some delicious Food
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              color: "#f64e32",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
