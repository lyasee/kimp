import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetBitcoinRate, bitcoinRate, bitcoinBinance } from '../stores/bitcoin';
import useInterval from '../hooks/useInterval';
import { coin } from '../stores/coin';

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const rate = useSelector(bitcoinRate);
  const binance = useSelector(bitcoinBinance);
  const coins = useSelector(coin);

  useInterval(() => {
    dispatch(fetchGetBitcoinRate());
  }, 2000);

  const getBitcoinPriceColor = (price: number, openPrice: number) => {
    if (price > openPrice) {
      return '#c34042';
    } else if (price === openPrice) {
      return '#fff';
    } else {
      return '#0966c6';
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
    <ScrollView style={styles.container}>
      <View style={styles.boxWrapper}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Binance</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.openPrice}>
              open {binance.openPrice.toFixed(2).toLocaleString()}
            </Text>
            <Text
              style={{
                ...styles.rate,
                color: getBitcoinPriceColor(binance.price, binance.openPrice),
              }}>
              {binance.price.toFixed(2).toLocaleString()}
            </Text>
            <Text
              style={{
                color: getBitcoinPriceColor(binance.price, binance.openPrice),
              }}>
              {getBitcoinPricePercentagMark(binance.price, binance.openPrice)}
              {Math.abs(binance.priceChangePercent)}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.boxWrapper}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Upbit</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.openPrice}>
              open {coins['KRW-BTC'].trade_price.toLocaleString()}
            </Text>
            <Text
              style={{
                ...styles.rate,
                color: getBitcoinPriceColor(
                  coins['KRW-BTC'].trade_price,
                  coins['KRW-BTC'].prev_closing_price,
                ),
              }}>
              {coins['KRW-BTC'].trade_price.toLocaleString()}
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

      <View style={styles.boxWrapper}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Long</Text>
          <Text style={{ ...styles.rate, color: '#c34042' }}>{rate.long}%</Text>
        </View>
      </View>

      <View style={styles.boxWrapper}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Short</Text>
          <Text style={{ ...styles.rate, color: '#0966c6' }}>{rate.short}%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  box: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#141313',
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccc',
  },
  usd: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccc',
    marginLeft: 8,
  },
  priceWrapper: {
    backgroundColor: '#141313',
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
});
