import React from 'react';
import { StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

const CoinOneReferralBox = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePress = () => {
    Linking.openURL('https://coinone.co.kr/user/signup?ref=5MPFRMEA');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ ...styles.container, backgroundColor: colors.referralBox }}>
        <Image
          source={require('../../assets/images/exchange/coinone_logo_blue.png')}
          resizeMode="contain"
          style={{ height: 18, marginLeft: -28, marginTop: 3 }}
        />

        <Text style={styles.text}>수수료 15퍼 할인받기</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoinOneReferralBox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 20,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'esamanru-medium',
    color: '#145ee7',
  },
});
