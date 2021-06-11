import * as React from 'react';
import { AppState, AppStateStatus, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { coin, coinNames, fetchGetCoinNames, setConnected } from '../stores/coin';
import { ITableSort, IWebSocketData, Sort, SortType } from '../types/coin.types';
import { binancePrices, fetchGetBinancePrices } from '../stores/binance';
import { currencyUSD, fetchGetCurrency } from '../stores/currency';
import useInterval from '../hooks/useInterval';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { useFocusEffect } from '@react-navigation/core';
import { toLocaleString } from '../utils/number';
import ListTopBannerAdmob from '../components/admob/ListTopBannerAdmob';
import { requestPermissionsAsync } from 'expo-ads-admob';
import TableColumnSortIcon from '../components/common/TableColumnSortIcon';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const dispatch = useDispatch();
  const items = useSelector(coin);
  const names = useSelector(coinNames);
  const binancePriceList = useSelector(binancePrices);
  const usd = useSelector(currencyUSD);
  const [sort, setSort] = React.useState<ITableSort>({
    type: SortType.가격,
    sort: Sort.DESC,
  });

  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    const init = async () => {
      await requestPermissionsAsync();
    };

    init();
  }, []);

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      getData();
    }

    appState.current = nextAppState;
  };

  const getData = React.useCallback(() => {
    dispatch(setConnected(new Date().getTime().toString()));
  }, [dispatch]);

  useFocusEffect(getData);

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

  const sortHandler = (a: string, b: string) => {
    const getValue = (key: string, type: string) => {
      if (type === SortType.김프) {
        return Number(getKimchiPercentage(key).replace('%', ''));
      } else if (type === SortType.이름) {
        return names[key].name;
      } else if (type === SortType.전일대비) {
        const minus = items[key].change === 'FALL';
        return minus ? Number(`-${items[key].change_rate}`) : items[key].change_rate;
      }

      return items[key].trade_price;
    };

    if (sort.sort === Sort.DESC) {
      return getValue(a, sort.type) > getValue(b, sort.type) ? -1 : 1;
    } else if (sort.sort === Sort.ASC) {
      return getValue(a, sort.type) > getValue(b, sort.type) ? 1 : -1;
    }

    return 1;
  };

  const handlePressTableHeader = (name: SortType) => {
    let newSort =
      sort.sort === Sort.ASC ? Sort.DESC : sort.sort === Sort.DESC ? Sort.NONE : Sort.ASC;

    if (sort.type !== SortType.없음 && sort.type !== name) {
      newSort === sort.sort;
    }

    setSort({
      type: name,
      sort: newSort,
    });
  };

  return (
    <View style={styles.container}>
      <ListTopBannerAdmob />
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
          <TouchableOpacity
            style={styles.name}
            onPress={() => {
              handlePressTableHeader(SortType.이름);
            }}>
            <Text style={{ ...styles.name, ...styles.headerTitle }}>
              이름{' '}
              <TableColumnSortIcon type={sort.type === SortType.이름 ? sort.sort : undefined} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upbitPrice}
            onPress={() => {
              handlePressTableHeader(SortType.가격);
            }}>
            <Text style={{ ...styles.upbitPrice, ...styles.headerTitle }}>
              가격{' '}
              <TableColumnSortIcon type={sort.type === SortType.가격 ? sort.sort : undefined} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upbitPriceRate}
            onPress={() => {
              handlePressTableHeader(SortType.전일대비);
            }}>
            <Text style={{ ...styles.upbitPriceRate, ...styles.headerTitle }}>
              전일대비{' '}
              <TableColumnSortIcon type={sort.type === SortType.전일대비 ? sort.sort : undefined} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.kimchi}
            onPress={() => {
              handlePressTableHeader(SortType.김프);
            }}>
            <Text style={{ ...styles.kimchi, ...styles.headerTitle }}>
              김프{' '}
              <TableColumnSortIcon type={sort.type === SortType.김프 ? sort.sort : undefined} />
            </Text>
          </TouchableOpacity>
        </View>

        {Object.keys(names)
          .filter((key) => names[key] && items[key])
          .sort(sortHandler)
          .map((key) => (
            <View key={key} style={{ ...styles.item, borderColor: colors.border }}>
              <Text style={styles.name}>{names[key].name}</Text>

              <Text
                style={{
                  ...styles.upbitPrice,
                  color: getPriceColor(items[key]),
                }}>
                {toLocaleString(Number(items[key].trade_price))}
                <Text
                  style={{
                    ...styles.binanceExchangeRatePrice,
                    color: colors.binanceExchangeRatePrice,
                  }}>
                  {'\n'}
                  {binancePriceList[key.replace('KRW-', '')]
                    ? toLocaleString(
                        Number(
                          (
                            binancePriceList[key.replace('KRW-', '')].price *
                            (usd ? usd.basePrice : 0)
                          ).toFixed(0),
                        ),
                      )
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
    alignItems: 'center',
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
    flex: 0.8,
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
