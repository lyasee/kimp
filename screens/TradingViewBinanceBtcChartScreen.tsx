import * as React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import BackHeader from '../components/basic/BackHeader';
import { View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

const TradingViewBinanceBtcChartScreen = () => {
  const colorScheme = useColorScheme();

  const options = {
    autosize: true,
    symbol: 'BINANCEUS:BTCBUSD',
    interval: '15',
    timezone: 'Asia/Seoul',
    theme: colorScheme,
    style: '1',
    locale: 'kr',
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    hide_legend: true,
    container_id: 'tradingview_58d94',
  };

  return (
    <View style={styles.container}>
      <BackHeader title="BTC BUSD" />
      <WebView
        source={{
          html: `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0;">
              <div class="tradingview-widget-container">
                <div id="tradingview_58d94"></div>
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

export default TradingViewBinanceBtcChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
