import React from 'react';
import {connect} from 'react-redux';
import colors from '../../utils/colors';
import {Title, Drawer} from 'react-native-paper';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const {width} = Dimensions.get('window');

function CustomDrawer(props) {
  const {navigation} = props;

  const logoutAction = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
            <Title style={styles.title}>Ahmed Ashraf</Title>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              labelStyle={styles.label}
              onPress={() => navigation.navigate('Home')}
              icon={() => (
                <FontAwesome5 name="home" size={20} color={colors.gray} />
              )}
            />
            <DrawerItem
              label="Profile"
              labelStyle={styles.label}
              onPress={() => navigation.navigate('Profile')}
              icon={() => (
                <FontAwesome5 name="user-alt" size={20} color={colors.gray} />
              )}
            />
            <DrawerItem
              labelStyle={styles.label}
              label="Topic Suggestion"
              onPress={() => navigation.navigate('Topics')}
              icon={() => (
                <FontAwesome5 name="list" size={20} color={colors.gray} />
              )}
            />
            <DrawerItem
              label="Privacy & Policy"
              labelStyle={styles.label}
              onPress={() => navigation.navigate('Home')}
              icon={() => (
                <FontAwesome5
                  size={15}
                  name="user-shield"
                  color={colors.gray}
                />
              )}
            />
            <DrawerItem
              label="About"
              labelStyle={styles.label}
              onPress={() => navigation.navigate('Home')}
              icon={() => (
                <FontAwesome5
                  size={20}
                  color={colors.gray}
                  name="question-circle"
                />
              )}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Logout"
          onPress={logoutAction}
          labelStyle={styles.logout}
          icon={() => (
            <SimpleLineIcons size={15} color={colors.primary} name="logout" />
          )}
        />
      </Drawer.Section>
    </View>
  );
}

function mapStateToProps({basicInfo}) {
  const {id, token, image, email, name, rooms} = basicInfo;
  return {id, token, image, email, name, rooms};
}

function mapDispatchToProps(dispatch) {
  return {
    saveImage: (payload) => {
      dispatch({type: 'SAVE_IMAGE', payload});
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  or: {
    fontSize: 15,
    color: 'silver',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input2: {
    height: 30,
    padding: 0,
    width: '95%',
    borderRadius: 3,
    marginVertical: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'silver',
    backgroundColor: 'white',
  },
  userInfoSection: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    elevation: 3,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  avatarText: {
    fontSize: 30,
    color: 'white',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
  },
  but1: {
    borderRadius: 4,
    width: width * 0.4,
    paddingVertical: 5,
    backgroundColor: 'orange',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    width: width * 0.87,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginRight: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 0,
  },
  preference: {
    paddingVertical: 12,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  model: {
    height: 250,
    width: width * 0.95,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cross: {
    fontSize: 25,
    color: 'red',
  },
  centerBox: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelHeader: {
    width: width * 0.87,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 30,
    height: 30,
  },
  logout: {
    marginLeft: -10,
    fontWeight: '900',
    color: colors.primary,
  },
  label: {
    marginLeft: -10,
    fontWeight: '900',
  },
});
