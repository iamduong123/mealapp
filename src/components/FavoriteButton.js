import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function FavoriteButton({ onPress, text }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "purple",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
    </TouchableOpacity>
  );
}
