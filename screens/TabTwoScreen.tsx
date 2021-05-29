import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetBitcoinRate,
  bitcoinRate,
  bitcoinBinance,
  fetchGetBitcoinBinance,
  bitcoinDominance,
} from '../stores/bitcoin';
import useInterval from '../hooks/useInterval';
import { coin } from '../stores/coin';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import Footer from '../components/basic/Footer';
import { useNavigation } from '@react-navigation/core';
import ReferralNotice from '../components/referral/ReferralNotice';
import { toLocaleString } from '../utils/number';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const dispatch = useDispatch();
  const rate = useSelector(bitcoinRate);
  const binance = useSelector(bitcoinBinance);
  const coins = useSelector(coin);
  const dominance = useSelector(bitcoinDominance);

  React.useEffect(() => {
    dispatch(fetchGetBitcoinRate());
    dispatch(fetchGetBitcoinBinance());
  }, [dispatch]);

  useInterval(() => {
    dispatch(fetchGetBitcoinRate());
  }, 1500);

  useInterval(() => {
    dispatch(fetchGetBitcoinBinance());
  }, 5000);

  const getBitcoinPriceColor = (price: number, openPrice: number) => {
    if (price > openPrice) {
      return colors.priceRise;
    } else if (price === openPrice) {
      return colors.priceEven;
    } else {
      return colors.priceFall;
    }
  };

  const getBitcoinPricePercentagMark = (price: number, openPrice: number) => {
    if (price > openPrice) {
      return '+';
    } else if (price === openPrice) {
      return '';
    } else {
      return '-';
    }
  };

  return (
    <View style={styles.container}>
      <ReferralNotice />
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TradingViewDominanceScreen');
          }}>
          <View style={styles.boxWrapper}>
            <View style={{ ...styles.box, backgroundColor: colors.bitcoinBox }}>
              <Text style={styles.boxTitle}>도미넌스</Text>
              <View
                style={{
                  ...styles.dominanceBox,
                  backgroundColor: colors.bitcoinBox,
                  marginTop: 8,
                }}>
                <View
                  style={{
                    ...styles.dominanceTextWrapper,
                    backgroundColor: colors.bitcoinBox,
                  }}>
                  <View
                    style={{ ...styles.dominanceTextWrapper, backgroundColor: colors.bitcoinBox }}>
                    <Text style={styles.dominanceLabel}>BTC</Text>
                    <Text style={styles.dominancePercentage}>
                      {dominance.btc ? dominance.btc.toString().trim() : '0'}%
                    </Text>
                  </View>

                  <View
                    style={{ ...styles.dominanceTextWrapper, backgroundColor: colors.bitcoinBox }}>
                    <Text style={styles.dominanceLabel}>, ETH</Text>
                    <Text style={styles.dominancePercentage}>
                      {dominance.eth ? dominance.eth.toString().trim() : '0'}%
                    </Text>
                  </View>
                </View>

                <View style={{ backgroundColor: colors.bitcoinBox }}>
                  <Text style={styles.dominanceLabel}>차트보기</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TradingViewBinanceBtcChartScreen');
          }}>
          <View style={styles.boxWrapper}>
            <View style={{ ...styles.box, backgroundColor: colors.bitcoinBox }}>
              <Text style={styles.boxTitle}>바이낸스</Text>
              <View style={{ ...styles.priceWrapper, backgroundColor: colors.bitcoinBox }}>
                <Text style={styles.openPrice}>
                  open {toLocaleString(Number(binance.openPrice.toFixed(2)))}
                </Text>
                <Text
                  style={{
                    ...styles.rate,
                    color: getBitcoinPriceColor(binance.price, binance.openPrice),
                  }}>
                  {toLocaleString(Number(binance.price.toFixed(2)))}
                </Text>
                <Text
                  style={{
                    color: getBitcoinPriceColor(binance.price, binance.openPrice),
                  }}>
                  {getBitcoinPricePercentagMark(binance.price, binance.openPrice)}
                  {Math.abs(binance.priceChangePercent)}%
                </Text>

                <Text style={styles.binanceChartLabel}>차트보기</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {coins['KRW-BTC'] && (
          <View style={styles.boxWrapper}>
            <View style={{ ...styles.box, backgroundColor: colors.bitcoinBox }}>
              <Text style={styles.boxTitle}>업비트</Text>
              <View style={{ ...styles.priceWrapper, backgroundColor: colors.bitcoinBox }}>
                <Text style={styles.openPrice}>
                  open {toLocaleString(coins['KRW-BTC'].prev_closing_price)}
                </Text>
                <Text
                  style={{
                    ...styles.rate,
                    color: getBitcoinPriceColor(
                      coins['KRW-BTC'].trade_price,
                      coins['KRW-BTC'].prev_closing_price,
                    ),
                  }}>
                  {toLocaleString(coins['KRW-BTC'].trade_price)}
                </Text>
                <Text
                  style={{
                    color: getBitcoinPriceColor(
                      coins['KRW-BTC'].trade_price,
                      coins['KRW-BTC'].prev_closing_price,
                    ),
                  }}>
                  {getBitcoinPricePercentagMark(
                    coins['KRW-BTC'].trade_price,
                    coins['KRW-BTC'].prev_closing_price,
                  )}
                  {(coins['KRW-BTC'].change_rate * 100).toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.boxWrapper}>
          <View style={{ ...styles.box, backgroundColor: colors.bitcoinBox }}>
            <Text style={styles.boxTitle}>Long</Text>
            <Text style={{ ...styles.rate, color: colors.priceRise }}>{rate.long}%</Text>
          </View>
        </View>

        <View style={styles.boxWrapper}>
          <View style={{ ...styles.box, backgroundColor: colors.bitcoinBox }}>
            <Text style={styles.boxTitle}>Short</Text>
            <Text style={{ ...styles.rate, color: colors.priceFall }}>{rate.short}%</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  boxWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 1,
  },
  box: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'esamanru-medium',
    color: '#c4c4c4',
  },
  usd: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccc',
    marginLeft: 8,
  },
  binanceChartLabel: {
    marginTop: 8,
    marginRight: 4,
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
  },
  dominanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dominanceTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  dominanceLabel: {
    marginRight: 4,
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
  },
  dominancePercentage: {
    color: '#bdbdbd',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dominanceMoreText: {
    fontFamily: 'esamanru-light',
    color: '#ccc',
  },
  priceWrapper: {
    alignItems: 'flex-end',
  },
  openPrice: {
    fontSize: 12,
    color: '#c5b8b8',
  },
  rate: {
    textAlign: 'right',
    fontSize: 30,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
  },
});
