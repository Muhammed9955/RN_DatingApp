import React, { useLayoutEffect } from "react";
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
import { auth } from "../firebase";

const Home = ({ navigation }) => {
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      hederStyle: { backgroundColor: "green" },
      hederTintStyle: { color: "black" },
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
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            <Icon name="settings" color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        {Array(10)
          .fill()
          .map((i) => (
            <CustomListItem />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
