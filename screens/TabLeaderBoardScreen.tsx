import { useFocusEffect } from '@react-navigation/core';
import * as React from 'react';
import { FlatList, Linking, Platform, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LeaderBoardTopBannerAdmob from '../components/admob/LeaderBoardTopBannerAdmob';
import LeaderBoardFooter from '../components/leaderBoard/LeaderBoardFooter';
import LeaderBoardListHeader from '../components/leaderBoard/LeaderBoardListHeader';
import LeaderBoardListItem from '../components/leaderBoard/LeaderBoardListItem';
import { View } from '../components/Themed';
import { leaderBoardLinkAdmob } from '../stores/admob';
import { fetchGetLeaderBoards, leaderBoardItems } from '../stores/leaderBoard';
import { AdMobInterstitial } from 'expo-ads-admob';
import { ILeaderBoard } from '../types/leaderBoard';

const TabLeaderBoardScreen = () => {
  const dispatch = useDispatch();
  const items = useSelector(leaderBoardItems);
  const leaderBoardLinkAD = useSelector(leaderBoardLinkAdmob);
  const [refreshing, setRefreshing] = React.useState(false);

  const sortedItems = items.slice().sort((a, b) => {
    return Number(a.profit) < Number(b.profit) ? 1 : Number(a.profit) > Number(b.profit) ? -1 : 0;
  });

  const getLeaderBoardList = React.useCallback(() => {
    dispatch(fetchGetLeaderBoards());
  }, [dispatch]);

  useFocusEffect(getLeaderBoardList);

  const handleRefresh = () => {
    setRefreshing(true);
    getLeaderBoardList();
    setTimeout(() => {
      setRefreshing(false);
    }, 400);
  };

  const leaderBoardLinkAdmobOpenHandler = async (item: ILeaderBoard) => {
    const handler = () => {
      linkOpenHandler(item);
    };

    AdMobInterstitial.removeAllListeners();
    await AdMobInterstitial.setAdUnitID(leaderBoardLinkAD.unitId);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
    AdMobInterstitial.addEventListener('interstitialDidClose', handler);
  };

  const linkOpenHandler = (item: ILeaderBoard) => {
    Linking.openURL(`https://bybt.com/Leaderboard/${item.id}`);
  };

  const handlePressName = async (item: ILeaderBoard) => {
    if (Platform.OS !== 'ios') {
      linkOpenHandler(item);
      return;
    }

    await leaderBoardLinkAdmobOpenHandler(item);
  };

  const _renderItem = ({ item, index }: { item: ILeaderBoard; index: number }) => {
    return <LeaderBoardListItem rank={index + 1} item={item} onPressName={handlePressName} />;
  };

  return (
    <View style={styles.container}>
      <LeaderBoardTopBannerAdmob />
      <FlatList
        ListHeaderComponent={<LeaderBoardListHeader />}
        ListFooterComponent={<LeaderBoardFooter />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={sortedItems}
        renderItem={_renderItem}
        keyExtractor={(item) => `leaderboard-${item.id}`}
      />
    </View>
  );
};

export default TabLeaderBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
