import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import colors from "../../utils/colors";
import window from "../../utils/window";
import { db } from "../../utils/api";
import cover from "../../../assets/cover.jpg";
import BackNavigation from "../../component/BackNavigation";
import { View, Text, Image, StyleSheet, SafeAreaView, StyleSheet,Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button } from "react-native";

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
       <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
               
               <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{uri:item.image}}/>
                
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
                        <Text style={styles.socialBarLabel}>78</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                        <Text style={styles.socialBarLabel}>25</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/metro/75/3498db/administrator-male.png'}}/>
                        <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>13</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
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
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
