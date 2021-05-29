import * as React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

const LeaderBoardFooter = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={styles.footer}>
      <Text style={{ ...styles.footerColor, color: colors.footerText }}>
        BitMEX Leaderboard Positions
      </Text>
    </View>
  );
};

export default LeaderBoardFooter;

const styles = StyleSheet.create({
  footer: {
    padding: 20,
  },
  footerColor: {
    fontSize: 12,
  },
});
