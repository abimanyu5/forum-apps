import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import window from "../../utils/window";
import colors from "../../utils/colors";
import { auth, db } from "../../utils/api";
import { Button } from "react-native-paper";
import * as Google from "expo-google-app-auth";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as Facebook from "expo-facebook";
import logo from "../../../assets/logoText.png";
import google from "../../../assets/google.png";
import facebook from "../../../assets/facebook.png";
import * as Notifications from "expo-notifications";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default ({ navigation }) => {
  const [psw, setPsw] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [number, setNumber] = useState("");
  const image =
    "https://mighil31.github.io/google-homepage/avatar_circle_blue_512dp.png";

  useEffect(() => {
    getNotification();
  }, []);

  const register = () => {
    let time = Date.now();
    setLoad(true);
    auth
      .createUserWithEmailAndPassword(email, psw)
      .then(async (user) => {
        let uid = user.user.uid;
        await AsyncStorage.setItem("uid", uid);
        db.collection("users")
          .doc(uid)
          .set({ name, email, psw, number, token, time, image })
          .then(() => {
            navigation.navigate("Dashboard");
            setLoad(false);
          });
      })
      .catch((error) => {
        alert(error);
        setLoad(false);
      });
  };

  const getNotification = async () => {
    let token;
    if (Constants.isDevice) {
      console.log(
        "🚀 ~ file: index.js ~ line 65 ~ getNotification= ~ Constants.isDevice",
        Constants.isDevice
      );
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else alert("Must use physical device");

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    console.log(
      "🚀 ~ file: index.js ~ line 94 ~ getNotification= ~ token",
      token
    );
    setToken(token);
  };

  const GooglelogIn = async () => {
    try {
      setLoad(true);
      let result = await Google.logInAsync({
        iosClientId:
          "178591423795-9f9okoa5c8o5uirjuerm2unuhtmqva5d.apps.googleusercontent.com",
        androidClientId:
          "178591423795-u32o92ngld3vgpufj2aa1b91u84optne.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "178591423795-6h47u8jtfman7g34d7amoekf5sntsc3o.apps.googleusercontent.com",
        iosStandaloneAppClientId:
          "178591423795-7rj5tlrnvkinmgad283oo232li87v9lv.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        let ref = db.collection("users").doc(result.user.id).get();
        ref.then(async (e) => {
          if (e.exists) {
            AsyncStorage.setItem("id", result.user.id);
            await db.collection("users").doc(result.user.id).update({ token });
            setLoad(false);
            navigation.navigate("Dashboard");
          } else {
            let time = Date.now();
            db.collection("users")
              .doc(result.user.id)
              .set({
                time,
                token,
                uid: result.user.id,
                name: result.user.name,
                email: result.user.email,
                image: result.user.photoUrl || image,
              })
              .then(() => {
                setLoad(false);
                AsyncStorage.setItem("id", result.user.id);
                navigation.navigate("Dashboard");
              })
              .catch((e) => {
                alert(e);
                setLoad(false);
              });
          }
        });
      }
    } catch (e) {
      setLoad(false);
      alert(e, "Something Went Wron!");
      return { error: true };
    }
  };

  const facebookRegister = async () => {
    try {
      await Facebook.initializeAsync({ appId: "441204123837129" });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`
        );
        const data = await response.json();
        console.log(
          "🚀 ~ file: index.js ~ line 173 ~ facebookRegister ~ data",
          data
        );
        db.collection("users")
          .doc(data.id)
          .get()
          .then((doc) => {
            console.log(
              "🚀 ~ file: index.js ~ line 171 ~ db.collection ~ doc.exists",
              doc.exists
            );
            if (doc.exists) {
            }
          });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        value={name}
        placeholder="Name"
        style={styles.input}
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        value={number}
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Phone Number"
        onChangeText={(e) => setNumber(e)}
      />
      <TextInput
        value={psw}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => setPsw(e)}
      />
      <Button
        loading={load}
        mode="contained"
        uppercase={false}
        onPress={register}
        style={styles.button}
        disabled={name === "" || email === "" || number === "" || psw === ""}
      >
        Create Account
      </Button>
      <View style={styles.socialLogos}>
        <TouchableOpacity style={styles.iconBox} onPress={GooglelogIn}>
          <Image source={google} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={facebookRegister} style={styles.iconBox}>
          <Image source={facebook} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text
        style={styles.accountTxt}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an Account?<Text style={styles.boldTxt}> Login</Text>
      </Text>
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
    borderRadius: 100,
    marginVertical: 30,
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
    marginBottom: 20,
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
  accountTxt: {
    fontSize: 13,
  },
  boldTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
