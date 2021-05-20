import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  Icon?: React.ReactElement;
  text: string;
  onPress?: () => void;
};

const Notice: React.FC<Props> = ({ Icon, text, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <View style={{ backgroundColor: colors.noticeBackground, ...styles.container }}>
        {Icon ? (
          Icon
        ) : (
          <MaterialCommunityIcons
            name="alert-circle-check-outline"
            size={22}
            color={colors.noticeText}
          />
        )}

        <Text style={{ color: colors.noticeText, ...styles.text }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 13,
    fontFamily: 'esamanru-light',
  },
});
