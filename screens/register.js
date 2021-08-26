import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Constants from "expo-constants";
import MainButton from "../components/MainButton";
import InputField from "../components/InputField";
import BG from "../assets/bg.png";

import { auth, db } from "../firebase";
import { Platform } from "react-native";

export default function Register({ navigation }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FullName, setFullName] = useState("");
  const [Gender, setGender] = useState("");
  const [Gradelevel, setGradelevel] = useState("");
  const [RelationShipStatus, setRelationShipStatus] = useState("");
  const [AuthUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const registerFunc = () => {
    console.log({
      Email: Email?.trim(),
      Password: Password?.trim(),
      FullName: FullName?.trim(),
      Gender: Gender?.trim(),
      Gradelevel: Gradelevel?.trim(),
      RelationShipStatus: RelationShipStatus?.trim(),
    });
    if (
      Email?.trim().length === 0 ||
      Password?.trim().length === 0 ||
      FullName?.trim().length === 0
    ) {
      alert("please fill all inputs ");
    } else if (
      Gender?.trim().length === 0 ||
      Gradelevel?.trim().length === 0 ||
      RelationShipStatus?.trim().length === 0
    ) {
      alert("please choose correct option");
    } else {
      auth
        .createUserWithEmailAndPassword(Email.trim(), Password.trim())
        .then((authUser) => {
          // console.log({ authUser });
          // console.log({ FullName, Gender, Gradelevel, RelationShipStatus });
          setAuthUser(authUser);
          db.collection("users").doc(authUser?.uid).set({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            fullName: FullName,
            gender: Gender,
            gradeLevel: Gradelevel,
            relationShipStatus: RelationShipStatus,
          });
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={90}
    >
      <StatusBar style="light" />
      <ScrollView>
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
              type="email"
              onChangeText={(text) => setEmail(text.trim())}
            />
            <InputField
              value={Password}
              placeholderText="Password:"
              type="password"
              secureTextEntry
              onChangeText={(text) => setPassword(text.trim())}
            />
            <InputField
              value={FullName}
              placeholderText="First & Last Name:"
              type="text"
              onChangeText={(text) => setFullName(text.trim())}
            />

            <Picker
              style={{ height: 50, width: "100%", fontSize: 20 }}
              selectedValue={Gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            >
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
            <Picker
              style={{ height: 50, width: "100%", fontSize: 20 }}
              selectedValue={Gradelevel}
              onValueChange={(itemValue, itemIndex) => setGradelevel(itemValue)}
            >
              <Picker.Item label="Grade Level" value="" />
              <Picker.Item label=" 9th grade" value=" 9th grade" />
              <Picker.Item label=" 10th grade" value=" 10th grade" />
              <Picker.Item label=" 11th grade" value=" 911h grade" />
              <Picker.Item label=" 12th grade" value=" 9t12 grade" />
            </Picker>
            <Picker
              style={{ height: 50, width: "100%", fontSize: 20 }}
              selectedValue={RelationShipStatus}
              onValueChange={(itemValue, itemIndex) =>
                setRelationShipStatus(itemValue)
              }
            >
              <Picker.Item label="RelationShip Status" value="" />
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="taken" value="taken" />
              <Picker.Item label="complicated" value="complicated" />
            </Picker>
            <MainButton onPress={registerFunc} text="Sign Up" width="70%" />
            <TouchableOpacity
              style={styles.newAccountButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.navButtonText}>
                Already have an acount? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },

  textBorder: {
    fontSize: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
    paddingTop: "30%",

    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "#ecf0f1",
    // padding: 8,
  },
  newAccountButton: {
    fontSize: 20,
    marginVertical: 50,
  },
});
