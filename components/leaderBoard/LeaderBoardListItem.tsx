import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { ILeaderBoard } from '../../types/leaderBoard';
import { toLocaleString } from '../../utils/number';
import { Text } from '../Themed';
import { Foundation, AntDesign } from '@expo/vector-icons';

type Props = {
  rank: number;
  item: ILeaderBoard;
  onPressName?: (item: ILeaderBoard) => void;
};

const LeaderBoardListItem: React.FC<Props> = ({ rank, item, onPressName }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getSide = (side: number) => {
    if (side === 1) {
      return {
        color: colors.priceFall,
        text: 'Short',
      };
    } else if (side === 2) {
      return {
        color: colors.priceRise,
        text: 'Long',
      };
    }

    return {
      color: colors.priceEven,
      text: '-',
    };
  };

  const handlePressName = () => {
    onPressName && onPressName(item);
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.background,
      }}>
      <Text style={styles.rank}>{rank}</Text>
      <TouchableOpacity onPress={handlePressName}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{item.userName}</Text>
          <AntDesign name="link" size={10} color="#888" />
        </View>
      </TouchableOpacity>
      <Text style={{ ...styles.side, color: getSide(item.predictedSide).color }}>
        {getSide(item.predictedSide).text}
      </Text>
      <Text style={styles.profit}>
        <Foundation size={14} name="bitcoin" color="#333" />{' '}
        <Text>{toLocaleString(Number((Number(item.profit) / 100000000).toFixed(2)))}</Text>
      </Text>
    </View>
  );
};

export default LeaderBoardListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
  },
  rank: {
    fontSize: 13,
    width: 30,
  },
  nameWrapper: {
    width: 140,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    marginRight: 4,
  },
  side: {
    textAlign: 'center',
    width: 100,
    fontSize: 13,
    fontWeight: 'bold',
  },
  profit: {
    fontSize: 13,
  },
});
