import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MainButton = ({ text, onPress, width = "70%" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={[styles.btnText]}> {text} </Text>
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
    width: "80%",
    marginVertical: 20,
  },
  btnText: {
    color: "white",
  },
});

export default MainButton;
