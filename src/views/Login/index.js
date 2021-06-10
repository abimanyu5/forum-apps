import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../utils/api";
import React, { useState } from "react";
import window from "../../utils/window";
import colors from "../../utils/colors";
import { Button } from "react-native-paper";
import logo from "../../../assets/logoText.png";
import google from "../../../assets/google.png";
import facebook from "../../../assets/facebook.png";
import * as Google from "expo-google-app-auth";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
  const [psw, setPsw] = useState("");
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  const login = () => {
    setLoad(true);
    auth
      .signInWithEmailAndPassword(email, psw)
      .then(async (user) => {
        let uid = user.user.uid;
        await AsyncStorage.setItem("uid", uid);
        navigation.navigate("Dashboard");
        setLoad(false);
      })
      .catch((error) => {
        alert(error);
        setLoad(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        value={psw}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => setPsw(e)}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.forgetTxtWrapper}
        onPress={() => navigation.navigate("ResetPsw")}
      >
        <Text style={styles.accountTxt}>Forget your Password?</Text>
      </TouchableOpacity>
      <Button
        loading={load}
        onPress={login}
        mode="contained"
        uppercase={false}
        style={styles.button}
        disabled={email === "" || psw === ""}
      >
        Login
      </Button>
      <Text
        style={styles.accountTxt}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an Account?
        <Text style={styles.boldTxt}> Create Account</Text>
      </Text>
      <View style={styles.socialLogos}>
        <TouchableOpacity style={styles.iconBox}>
          <Image source={google} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBox}>
          <Image source={facebook} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    height: 100,
    resizeMode: "contain",
    width: window.width * 0.6,
  },
  button: {
    width: 250,
    marginBottom: 30,
    borderRadius: 100,
    paddingVertical: 5,
    backgroundColor: colors.primary,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  iconBox: {
    width: 80,
    height: 60,
    margin: 10,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    borderColor: "gainsboro",
    justifyContent: "center",
  },
  socialLogos: {
    marginTop: 50,
    flexDirection: "row",
  },
  input: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 30,
    borderColor: "gainsboro",
    backgroundColor: "white",
    width: window.width * 0.9,
  },
  forgetTxtWrapper: {
    paddingVertical: 20,
    alignItems: "flex-end",
    width: window.width * 0.85,
  },
  accountTxt: {
    fontSize: 13,
  },
  boldTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
