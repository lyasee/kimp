import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

export enum ListTabValue {
  전체 = 'all',
  관심 = 'favorite',
}

type Props = {
  value: ListTabValue;
  onChange: (value: ListTabValue) => void;
};

const ListTab: React.FC<Props> = ({ value, onChange }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const activeColor = colors.listTabActiveColor;
  const isActiveFavorites = value === ListTabValue.관심;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onChange(ListTabValue.전체);
        }}>
        <View
          style={{
            ...styles.tab,
            borderColor: !isActiveFavorites ? activeColor : colors.listTabBorder,
            backgroundColor: !isActiveFavorites ? activeColor : colors.listTabBackground,
          }}>
          <Text
            style={{
              ...styles.text,
              color: !isActiveFavorites
                ? colors.listTabActiveFontColor
                : colors.listTabInActiveFontColor,
            }}>
            전체
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onChange(ListTabValue.관심);
        }}>
        <View
          style={{
            ...styles.tab,
            borderColor: isActiveFavorites ? activeColor : colors.listTabBorder,
            backgroundColor: isActiveFavorites ? activeColor : colors.listTabBackground,
          }}>
          <Text
            style={{
              ...styles.text,
              color: isActiveFavorites
                ? colors.listTabActiveFontColor
                : colors.listTabInActiveFontColor,
            }}>
            관심
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
  },
});
