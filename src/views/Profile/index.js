import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import colors from "../../utils/colors";
import window from "../../utils/window";
import cover from "../../../assets/cover.jpg";
import BackNavigation from "../../component/BackNavigation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default ({ navigation }) => {
  const logout = async () => {
    navigation.navigate("Login");
    await AsyncStorage.removeItem("uid");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackNavigation onPress={() => navigation.toggleDrawer()} logo />
      <View style={styles.userInfoContainer} />
      <View style={styles.userInfoBox}>
        <Image source={cover} style={styles.avatar} />
        <Text style={styles.name}>Ahmed Ashraf</Text>
        <Text style={styles.email}>Ahmedr.0331@gmail.com</Text>
      </View>
      <View style={styles.userDetailsBox}>
        <TouchableNativeFeedback onPress={() => navigation.navigate("Home")}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <FontAwesome5 name="home" size={20} color={colors.white} />
            </View>
            <Text style={styles.label}>Dashboard</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={styles.row}>
            <View style={styles.icon}>
              <FontAwesome5 name="lock" size={20} color={colors.white} />
            </View>
            <Text style={styles.label}>Change Password</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => navigation.navigate("Topics")}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <FontAwesome5 name="list" size={20} color={colors.white} />
            </View>
            <Text style={styles.label}>Suggestion Topic</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={logout}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                size={20}
                color={colors.white}
                name="logout"
              />
            </View>
            <Text style={styles.label}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  userInfoContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  userInfoBox: {
    height: 200,
    elevation: 5,
    marginTop: -140,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: window.width * 0.9,
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  email: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold",
    color: colors.gray,
  },
  userDetailsBox: {
    marginTop: 20,
  },
  row: {
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    backgroundColor: colors.white,
    borderBottomColor: colors.silver,
  },
  label: {
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "bold",
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});
