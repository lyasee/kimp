import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import BackHeader from '../components/basic/BackHeader';
import useColorScheme from '../hooks/useColorScheme';

const TradingViewDominanceScreen = () => {
  const colorScheme = useColorScheme();

  const options = {
    autosize: true,
    symbol: 'CRYPTOCAP:BTC.D',
    interval: 'D',
    timezone: 'Asia/Seoul',
    theme: colorScheme,
    style: '1',
    locale: 'kr',
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    hide_legend: true,
    container_id: 'tradingview_8feb5',
  };

  return (
    <View style={styles.container}>
      <BackHeader title="BTC Dominance" />
      <WebView
        source={{
          html: `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0;">
            <div class="tradingview-widget-container">
              <div id="tradingview_8feb5"></div>
              <div class="tradingview-widget-copyright">TradingView 제공 <a href="https://kr.tradingview.com/symbols/CRYPTOCAP-BTC.D/" rel="noopener" target="_blank"><span class="blue-text">BTC.D 차트</span></a></div>
              <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
              <script type="text/javascript">
              new TradingView.widget(${JSON.stringify(options)});
              </script>
            </div>
            </body>
          </html>
          `,
        }}
      />
    </View>
  );
};

export default TradingViewDominanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
