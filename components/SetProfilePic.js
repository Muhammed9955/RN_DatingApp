import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import MainButton from "./MainButton";

const SetProfilePic = () => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{
          uri: "https://hsc.unm.edu/community/assets/img/faces/no-image.png",
        }}
        size="xlarge"
      />
      <MainButton
        text="Select Profile Pic"
        bg="green"
        color="white"
        width="70%"
        fontSize={30}
      />
      <TouchableOpacity>
        <Text styles={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
          Set Up Later
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetProfilePic;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
