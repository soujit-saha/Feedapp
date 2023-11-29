import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    //@ts-ignore
    setTimeout(() => navigation?.replace('Home' as never), 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Animatable.Text animation="flipInY" delay={600} style={styles.txt}>
        Feed <Animatable.Text style={styles.txtb}>App</Animatable.Text>
      </Animatable.Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txt: {
    marginTop: normalize(20),
    fontSize: normalize(24),
    color: COLORS.Primary,
  },
  txtb: {
    fontSize: normalize(24),
    color: COLORS.Black,
  },
});
