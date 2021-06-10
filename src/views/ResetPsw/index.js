import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import window from "../../utils/window";
import colors from "../../utils/colors";
import { Button } from "react-native-paper";
import logo from "../../../assets/logoText.png";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(e) => setEmail(e)}
      />
      <View
        style={styles.forgetTxtWrapper}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.accountTxt}>Remember Password?</Text>
      </View>
      <Button
        mode="contained"
        uppercase={false}
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        Reset Password
      </Button>
      <Text
        style={styles.accountTxt}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an Account?
        <Text style={styles.boldTxt}> Create Account</Text>
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
    marginVertical: 10,
    paddingVertical: 10,
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
