import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BackHeader from '../components/basic/BackHeader';
import Notice from '../components/common/Notice';
import BinanceReferralBox from '../components/referral/BinanceReferralBox';
import CoinOneReferralBox from '../components/referral/CoinOneReferralBox';
import { View } from '../components/Themed';

const ReferralListScreen = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="수수료 할인" />
      <Notice text="원하는 거래소를 선택한 후 수수료 할인받으세요!" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.boxWrapper}>
          <CoinOneReferralBox />
        </View>
        <View style={styles.boxWrapper}>
          <BinanceReferralBox />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferralListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 8,
  },
  boxWrapper: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
