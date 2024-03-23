import React from "react";
import { Text, StyleSheet } from "react-native";

const CustomText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto", // You can replace "Roboto" with your preferred font family
    fontSize: 16,
    color: "#333", // Default color
  },
});

export default CustomText;
