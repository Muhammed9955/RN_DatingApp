import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputField = ({ inputValue, placeholderText, ...rest }) => {
  return (
    <View style={styles.input}>
      <TextInput
        // onChangeText={onChangeText}
        value={inputValue}
        placeholder={placeholderText}
        placeholderTextColor="black"
        fontSize={30}
        numberOfLines={1}
        styles={styles.input}
        {...rest}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    height: 60,
    width: "100%",
    marginVertical: 20,
  },
});

export default InputField;
