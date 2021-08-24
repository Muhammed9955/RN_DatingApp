import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Icon, Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      console.log({ docs: snapshot.docs });
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);
  console.log({ chats });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerStyle: { backgroundColor: "green" },
      headerTintStyle: { color: "black" },
      headerLeft: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={signOut}
            style={{ marginRight: 10 }}
          >
            <Avatar
              rounded
              source={{
                uri: "https://hsc.unm.edu/community/assets/img/faces/no-image.png",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <MaterialCommunityIcons name="chat-plus" color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Icon name="settings" color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  console.log({ chats });
  console.log({ currentUser: auth.currentUser });

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map((i) => (
          <CustomListItem
            key={i.id}
            id={i.id}
            chatName={i.data.chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
