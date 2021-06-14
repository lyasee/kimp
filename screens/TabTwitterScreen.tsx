import * as React from 'react';
import { AdMobInterstitial } from 'expo-ads-admob';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  activeTwitterTabAdmob,
  twitterTabAdmob,
  setIncrementTwitterTabAdmobCount,
} from '../stores/admob';

enum Tab {
  Musk = 'musk',
  Whale = 'whale',
}

const TabTwitterScreen = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const muskHtml = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="background-color: ${colorScheme === 'dark' ? 'black' : 'white'};">
    <a class="twitter-timeline" data-chrome="transparent" data-theme="${colorScheme}" href="https://twitter.com/elonmusk?ref_src=twsrc%5Etfw">Tweets by elonmusk</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </body>
</html>
`;

  const whaleHtml = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="background-color: ${colorScheme === 'dark' ? 'black' : 'white'};">
    <a class="twitter-timeline" data-chrome="transparent" data-theme="${colorScheme}" href="https://twitter.com/whale_alert?ref_src=twsrc%5Etfw">Tweets by whale_alert</a> 
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </body>
</html>
`;

  const dispatch = useDispatch();
  const twitterTabAD = useSelector(twitterTabAdmob);
  const activeTwitterTabAD = useSelector(activeTwitterTabAdmob);

  const [tab, setTab] = React.useState(Tab.Musk);

  React.useEffect(() => {
    const init = async () => {
      dispatch(setIncrementTwitterTabAdmobCount());

      if (activeTwitterTabAD) {
        await AdMobInterstitial.setAdUnitID(twitterTabAD.unitId);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
      }
    };

    if (Platform.OS === 'ios') {
      init();
    }
  }, []);

  return (
    <View style={styles.contatiner}>
      <SafeAreaView edges={['top']} />
      <View style={{ ...styles.tabs, borderColor: colors.border }}>
        <TouchableOpacity
          onPress={() => {
            setTab(Tab.Musk);
          }}>
          <View
            style={{
              ...styles.tab,
              borderColor: tab === Tab.Musk ? colors.tabActive : colors.background,
            }}>
            <Text
              style={{
                ...styles.tabText,
                color: tab === Tab.Musk ? colors.tabActive : colors.tabInActive,
              }}>
              Musk
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTab(Tab.Whale);
          }}>
          <View
            style={{
              ...styles.tab,
              borderColor: tab === Tab.Whale ? colors.tabActive : colors.background,
            }}>
            <Text
              style={{
                ...styles.tabText,
                color: tab === Tab.Whale ? colors.tabActive : colors.tabInActive,
              }}>
              Whale_alert
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {tab === Tab.Musk && <WebView source={{ html: muskHtml }} />}
      {tab === Tab.Whale && <WebView source={{ html: whaleHtml }} />}
    </View>
  );
};

export default TabTwitterScreen;

const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 4,
  },
  tabText: {
    fontSize: 18,
    fontFamily: 'esamanru-light',
  },
});
