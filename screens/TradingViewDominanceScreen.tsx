import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import BackHeader from '../components/basic/BackHeader';

const TradingViewDominanceScreen = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="도미넌스 차트" />
      <WebView source={{ uri: 'https://kr.tradingview.com/chart/?symbol=CRYPTOCAP%3ABTC.D' }} />
    </View>
  );
};

export default TradingViewDominanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
