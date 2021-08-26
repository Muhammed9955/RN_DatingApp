import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MainButton = ({
  text,
  onPress,
  width = "70%",
  bg = "black",
  color = "white",
  fontSize = 14,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, { width, backgroundColor: bg, color }]}
    >
      <Text style={{ color, fontSize: 18 }}> {text} </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 40,
    marginVertical: 20,
  },
});

export default MainButton;
