import React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Notice from '../common/Notice';

const ReferralNotice = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleGoReferralScreen = () => {
    navigation.navigate('ReferralList');
  };

  return (
    <Notice
      Icon={<MaterialCommunityIcons name="sale" size={22} color={colors.noticeText} />}
      text="거래소 수수료 할인코드 받기"
      onPress={handleGoReferralScreen}
    />
  );
};

export default ReferralNotice;
