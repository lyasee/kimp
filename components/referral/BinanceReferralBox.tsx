import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

const BinanceReferralBox = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePress = () => {
    Linking.openURL('https://www.binance.com/ko/register?ref=AYACHN24');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ ...styles.container, backgroundColor: colors.referralBox }}>
        <Image
          source={require('../../assets/images/exchange/binance_logo.png')}
          resizeMode="contain"
          style={{ marginLeft: -3, width: 110, height: 21 }}
        />

        <Text style={styles.text}>수수료 10퍼 할인받기</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BinanceReferralBox;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'esamanru-medium',
    color: '#F0B90B',
  },
});
