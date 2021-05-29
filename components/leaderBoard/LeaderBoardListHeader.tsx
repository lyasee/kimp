import * as React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

type Props = {};

const LeaderBoardListHeader: React.FC<Props> = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View
      style={{
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.tableHeaderBackground,
      }}>
      <Text style={styles.rank}>순위</Text>
      <Text style={styles.name}>이름</Text>
      <Text style={{ ...styles.side }}>포지션</Text>
      <Text style={styles.profit}>이익</Text>
    </View>
  );
};

export default LeaderBoardListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 10,
    borderBottomWidth: 1,
  },
  rank: {
    width: 35,
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    width: 140,
    fontSize: 12,
    fontWeight: 'bold',
  },
  side: {
    textAlign: 'center',
    width: 100,
    fontSize: 12,
    fontWeight: 'bold',
  },
  profit: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
