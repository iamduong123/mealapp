import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading(props) {
  return (
    <View>
      <ActivityIndicator {...props} />
    </View>
  );
}
