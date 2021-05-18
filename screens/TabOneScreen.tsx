import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { coin, coinNames, fetchGetCoinNames } from '../stores/coin';
import { IWebSocketData } from '../types/coin.types';
import { binancePrices, fetchGetBinancePrices } from '../stores/binance';
import { currencyUSD, fetchGetCurrency } from '../stores/currency';
import useInterval from '../hooks/useInterval';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
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
      return colors.priceRise;
    } else if (trade_price === prev_closing_price) {
      return colors.priceEven;
    } else {
      return colors.priceFall;
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
        <View style={styles.topDescriptionWrapper}>
          <Text style={{ ...styles.description, color: colors.exchangeRate }}>
            환율: {usd.basePrice}
          </Text>
          <Text style={{ ...styles.description, color: colors.exchangeRate }}>
            회색은 바이낸스 가격입니다.
          </Text>
        </View>

        <View
          style={{
            ...styles.header,
            borderColor: colors.border,
            backgroundColor: colors.tableHeaderBackground,
          }}>
          <Text style={{ ...styles.name, ...styles.headerTitle }}>이름</Text>
          <Text style={{ ...styles.upbitPrice, ...styles.headerTitle }}>가격</Text>
          <Text style={{ ...styles.upbitPriceRate, ...styles.headerTitle }}>전일대비</Text>
          <Text style={{ ...styles.kimchi, ...styles.headerTitle }}>김프</Text>
        </View>

        {Object.keys(items)
          .filter((key) => names[key] && items[key])
          .map((key) => (
            <View key={key} style={{ ...styles.item, borderColor: colors.border }}>
              <Text style={styles.name}>{names[key].name}</Text>

              <Text
                style={{
                  ...styles.upbitPrice,
                  color: getPriceColor(items[key]),
                }}>
                {Number(items[key].trade_price).toLocaleString()}
                <Text
                  style={{
                    ...styles.binanceExchangeRatePrice,
                    color: colors.binanceExchangeRatePrice,
                  }}>
                  {'\n'}
                  {binancePriceList[key.replace('KRW-', '')]
                    ? Number(
                        (
                          binancePriceList[key.replace('KRW-', '')].price *
                          (usd ? usd.basePrice : 0)
                        ).toFixed(0),
                      ).toLocaleString()
                    : 0}
                </Text>
              </Text>

              <Text
                style={{
                  ...styles.upbitPriceRate,
                  color: getPriceColor(items[key]),
                }}>
                {getUpbitPriceMark(items[key].change)}
                {Number(items[key].change_rate * 100).toFixed(2)}%
              </Text>
              <Text style={{ ...styles.kimchi, ...styles.bold, color: colors.kimchiPercentage }}>
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
  topDescriptionWrapper: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 11,
    fontFamily: 'esamanru-light',
  },
  header: {
    padding: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: 'esamanru-light',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    flex: 1,
  },
  upbitPrice: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
  binanceExchangeRatePrice: {
    fontSize: 12,
  },
  upbitPriceRate: {
    flex: 0.7,
    fontSize: 14,
    textAlign: 'right',
  },
  kimchi: {
    fontSize: 14,
    flex: 0.8,
    textAlign: 'right',
  },
  bold: {
    fontWeight: 'bold',
  },
});
