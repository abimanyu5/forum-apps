import React, {useEffect} from 'react';
import colors from '../../utils/colors';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getUid();
  }, [isFocused]);

  const getUid = async () => {
    let uid = await AsyncStorage.getItem('uid');
    if (uid) navigation.navigate('Dashboard');
    else navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
