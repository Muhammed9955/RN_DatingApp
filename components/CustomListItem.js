import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, enterChat, chatName, data, isProfile }) => {
  const { fullName, relationShipStatus, gradeLevel, gender } = data;
  const [chatMessages, setChatMessages] = useState([]);
  // console.log({ data });
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, []);
  // console.log({ chatName });
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id}>
      <View>
        <Avatar
          rounded
          size="medium"
          source={{
            uri:
              chatMessages?.[0]?.photoURL ||
              "https://randomuser.me/api/portraits/men/41.jpg",
          }}
        />
        <Badge
          status="success"
          containerStyle={{ position: "absolute", top: 2, right: 2 }}
        />
      </View>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        {isProfile ? (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {`${relationShipStatus}, ${gradeLevel}, ${gender}  `}
          </ListItem.Subtitle>
        ) : (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {`last message`}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
