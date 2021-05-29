import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { View, Text } from '../Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  border?: boolean;
  title?: string;
};

const BackHeader: React.FC<Props> = ({ border, title }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.backHeader }} edges={['top']}>
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.backHeader,
          borderBottomWidth: border ? 1 : 0,
          borderColor: colors.border,
        }}>
        <TouchableOpacity
          onPress={handleBack}
          hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}>
          <View style={{ ...styles.backIcon, backgroundColor: colors.backHeader }}>
            <Ionicons name="ios-arrow-back" size={28} color={colors.backHeaderIcon} />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={{ ...styles.backIcon, backgroundColor: colors.backHeader }} />
      </View>
    </SafeAreaView>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    justifyContent: 'center',
    width: 80,
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'esamanru-light',
  },
});
