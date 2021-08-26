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


const PrivateMessagesScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };


  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      // console.log({ docs: snapshot.docs });
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    db.collection("users").onSnapshot((snapshot) => {
      // console.log({ docs: snapshot.docs });
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);
  // console.log({ users });
  // console.log({ chats });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Full Name",
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
            // flexDirection: "row",
            // justifyContent: "space-between",
            // width: 70,
            // marginRight: 10,
          }}
        >
          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <MaterialCommunityIcons name="chat-plus" color="white" size={24} />
          </TouchableOpacity> */}
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
  // console.log({ chats });
  // console.log({ currentUser_uid: auth.currentUser.uid });
  return (
    <SafeAreaView>
      <View
        style={{
          height: "8%",
          backgroundColor: "lightgrey",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          borderColor: "black",
          borderBottomWidth: 5,
        }}
      >
        <Text style={styles.headerTitle}>Private Messages</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* {chats.map((i) => (
          <CustomListItem
            key={i.id}
            id={i.id}
            enterChat={enterChat}
            data={i.data}
          />
        ))} */}
        {users.map((i) => (
          <CustomListItem
            key={i.id}
            id={i.id}
            data={i.data}
            chatName={i.data.fullName}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivateMessagesScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    padding: 10,
  },
  
});
