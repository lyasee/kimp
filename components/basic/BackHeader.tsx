import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import { View, Text } from '../Themed';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title?: string;
};

const BackHeader: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.backHeader }}>
      <View style={{ ...styles.container, backgroundColor: colors.backHeader }}>
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
    minHeight: 48,
    borderBottomWidth: 1,
    borderColor: '#f2f2f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    justifyContent: 'center',
    width: 80,
    height: 47,
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'esamanru-light',
  },
});
