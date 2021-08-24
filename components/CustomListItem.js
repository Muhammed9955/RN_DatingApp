import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = () => {
  return (
    <ListItem>
      <Avatar
        rounded
        size="medium"
        source={{
          uri:
            // chatMessages?.[0].photoURL ||
            "https://hsc.unm.edu/community/assets/img/faces/no-image.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>Full Name</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Message................
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
