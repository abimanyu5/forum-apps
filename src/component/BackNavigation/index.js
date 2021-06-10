import React from 'react';
import colors from '../../utils/colors';
import window from '../../utils/window';
import Logo from '../../../assets/logoText.png';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({label, onPress, isBack, logo}) => {
  return (
    <View>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.row}>
          {isBack ? (
            <MaterialCommunityIcons
              onPress={onPress}
              style={styles.backIcon}
              name="keyboard-backspace"
            />
          ) : (
            <MaterialCommunityIcons
              name="menu"
              onPress={onPress}
              style={styles.backIcon}
            />
          )}
          {logo ? (
            <Image source={Logo} style={styles.logo} />
          ) : (
            <Text style={styles.label}>{label}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: window.width,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backBox: {
    paddingRight: 15,
  },
  back: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.white,
  },
  logo: {
    width: 120,
    height: 25,
    resizeMode: 'contain',
  },
  backIcon: {
    fontSize: 30,
    paddingRight: 15,
    color: colors.white,
  },
});
