import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Footer = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View>
      <Text style={{ ...styles.text }}>© kimp. All rights reserved</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#555',
  },
});
