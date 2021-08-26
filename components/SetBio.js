import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import MainButton from "./MainButton";

const SetBio = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 30 }}>
        To find perfct match make sure to share a little information about
        yourself
      </Text>
      <TextInput
        style={{ backgroundColor: "lightgrey", padding: 10, width: "100%" }}
        // {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={40}
        numberOfLines={8}
        // value={Email}
        placeholderText="Email:"
        // onChangeText={(text) => setEmail(text)}
      />
      <MainButton
        text="Submit"
        bg="green"
        color="white"
        width="70%"
        fontSize={30}
      />
    </View>
  );
};

export default SetBio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "auto",
    padding: 10,
  },
});
