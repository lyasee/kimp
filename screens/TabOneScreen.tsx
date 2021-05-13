import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { coin, coinNames, fetchGetCoinNames } from '../stores/coin';
import { IWebSocketData } from '../types/coin.types';
import { binancePrices, fetchGetBinancePrices } from '../stores/binance';
import { currencyUSD, fetchGetCurrency } from '../stores/currency';
import useInterval from '../hooks/useInterval';

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const items = useSelector(coin);
  const names = useSelector(coinNames);
  const binancePriceList = useSelector(binancePrices);
  const usd = useSelector(currencyUSD);

  React.useEffect(() => {
    dispatch(fetchGetCoinNames());
    dispatch(fetchGetCurrency());
  }, [dispatch]);

  const getPriceColor = ({ trade_price, prev_closing_price }: IWebSocketData) => {
    if (trade_price > prev_closing_price) {
      return '#c34042';
    } else if (trade_price === prev_closing_price) {
      return '#fff';
    } else {
      return '#0966c6';
    }
  };

  useInterval(() => {
    dispatch(fetchGetBinancePrices());
  }, 1000);

  const getKimchiPercentage = (key: string) => {
    const upbitKey = key;
    const binanceKey = key.replace('KRW-', '');

    const usdExchangeRatePrice = usd ? usd.basePrice : 0;
    const upbitPrice = items[upbitKey] ? items[upbitKey].trade_price : 0;
    const binancePrice = binancePriceList[binanceKey] ? binancePriceList[binanceKey].price : 0;

    const percentage = ((upbitPrice / (binancePrice * usdExchangeRatePrice)) * 100 - 100).toFixed(
      2,
    );

    return binancePrice ? `${percentage}%` : '';
  };

  const getUpbitPriceMark = (change: string) => {
    if (change === 'RISE') {
      return '+';
    } else if (change === 'FALL') {
      return '-';
    } else {
      return '';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text>환율: {usd.basePrice}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.name}>이름</Text>
          <View style={styles.ubbitPriceColumn}>
            <Text style={styles.upbitPrice}>업비트</Text>
          </View>
          <Text style={styles.kimchi}>김프</Text>
        </View>

        {Object.keys(items).map((key) => (
          <View key={key} style={styles.item}>
            <Text style={styles.name}>{names[key].name}</Text>
            <View style={styles.ubbitPriceColumn}>
              <Text
                style={{
                  ...styles.upbitPrice,
                  color: getPriceColor(items[key]),
                }}>
                {Number(items[key].trade_price).toLocaleString()}
              </Text>
              <Text
                style={{
                  ...styles.upbitPriceRate,
                  color: getPriceColor(items[key]),
                }}>
                {Number(items[key].change_rate * 100).toFixed(2)}%
              </Text>
            </View>
            <Text style={{ ...styles.kimchi, color: '#ccc' }}>
              {getUpbitPriceMark(items[key].change)}
              {getKimchiPercentage(key)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#141313',
    flexDirection: 'row',
  },
  name: {
    width: 140,
  },
  ubbitPriceColumn: {
    width: 120,
  },
  upbitPrice: {
    fontSize: 14,
    textAlign: 'right',
  },
  upbitPriceRate: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'right',
  },
  kimchi: {
    textAlign: 'right',
    flex: 1,
  },
});
