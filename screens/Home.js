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
import MainButton from "../components/MainButton";
import { Button, Overlay } from "react-native-elements";
import SetProfilePic from "../components/SetProfilePic";
import SetBio from "../components/SetBio";

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const [visible, setVisible] = useState(true);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

    // return unsubscribe;
  }, []);

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

  // console.log({ currentUser: auth.currentUser });
  useEffect(() => {
    const func = async function getDoc() {
      const snapshot = await db
        .collection("users")
        .where("uid", "==", auth.currentUser.uid)
        .get();
      const data = snapshot.data();
      console.log({ snapshot });
      console.log({ data });
    };
    return func;
  }, []);

  // console.log({ chats });
  // console.log({ users });
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
        <MaterialCommunityIcons name="heart" color="green" size={50} />
        <MainButton text="filter" width="60%" />
        <MaterialCommunityIcons name="heart" color="green" size={50} />
      </View>
      <ScrollView style={styles.container}>
        {chats.map((i) => (
          <CustomListItem
            key={i.id}
            id={i.id}
            enterChat={enterChat}
            data={i.data}
          />
        ))}
        {users.map((i) => (
          <CustomListItem
            key={i.id}
            id={i.id}
            data={i.data}
            chatName={i.data.fullName}
            isProfile
          />
        ))}
        <View style={{ height: "20%" }}>
          {/* <Button title="Open Overlay" onPress={toggleOverlay} /> */}
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={styles.Overlay}
          >
            <SetProfilePic />
            {/* <SetBio /> */}
          </Overlay>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  Overlay: {
    width: "100%",
    height: "50%",
    bottom: 0,
    left: 0,
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});
