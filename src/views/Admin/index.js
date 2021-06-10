import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import colors from "../../utils/colors";
import window from "../../utils/window";
import { db } from "../../utils/api";
import cover from "../../../assets/cover.jpg";
import BackNavigation from "../../component/BackNavigation";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

function Home(props) {
  const { saveUser, navigation } = props;
  useEffect(() => {
    getData();
  }, []);

  const onRefresh = useCallback(() => {
    getData();
  }, []);

  const getData = () => {
    getUser();
  };

  const getUser = async () => {
    let uid = await AsyncStorage.getItem("uid");
    let user = await db.collection("users").doc(uid).get();
    saveUser(user.data());
  };

  return (
    <SafeAreaView>
      <BackNavigation onPress={() => navigation.toggleDrawer()} logo />
      <Image source={cover} style={styles.cover} />
      <View></View>
    </SafeAreaView>
  );
}

function mapStateToProps({ basicInfo }) {
  return {
    uid: basicInfo.uid,
    name: basicInfo.name,
    image: basicInfo.image,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (payload) => {
      dispatch({ type: "SAVE_USER", payload });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  cover: {
    height: 120,
    width: window.width,
  },
});
