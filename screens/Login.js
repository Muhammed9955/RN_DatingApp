import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import MainButton from "../components/MainButton";
import InputField from "../components/InputField";
import BG from "../assets/bg.png";
const image = { uri: "https://reactjs.org/logo-og.png" };

import { auth } from "../firebase";
import { Platform } from "react-native";

export default function Login({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const loginFunc = () => {
    if (Email?.trim().length === 0 || Password?.trim().length === 0) {
      alert("please fill all inputs ");
    }
    auth
      .signInWithEmailAndPassword(Email.trim(), Password.trim())
      .catch((err) => alert(err));
  };
  return (
    <KeyboardAvoidingView
      enabled
      style={styles.contianer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={90}
    >
      <StatusBar style="light" />
      <ImageBackground source={BG} resizeMode="cover" style={styles.image}>
        <Text style={styles.header}>LRHS Dating</Text>
        <Image
          style={styles.logo}
          source={require("../assets/datingApp_Logo.png")}
        />
        <View style={styles.form}>
          <InputField
            value={Email}
            placeholderText="Email:"
            onChangeText={(text) => setEmail(text)}
          />
          <InputField
            value={Password}
            placeholderText="Password:"
            type="password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <MainButton onPress={loginFunc} text="Sign In" width="70%" />
        </View>

        <Text style={styles.text}>Forgot password</Text>

        <TouchableOpacity
          style={styles.newAccountButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  form: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: "30%",
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#ecf0f1",
    // padding: 8,
  },
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  newAccountButton: {
    fontSize: 20,
    marginVertical: 50,
  },
});
