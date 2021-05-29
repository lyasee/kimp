import { useFocusEffect } from '@react-navigation/core';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LeaderBoardFooter from '../components/leaderBoard/LeaderBoardFooter';
import LeaderBoardListHeader from '../components/leaderBoard/LeaderBoardListHeader';
import LeaderBoardListItem from '../components/leaderBoard/LeaderBoardListItem';
import { View } from '../components/Themed';
import { fetchGetLeaderBoards, leaderBoardItems } from '../stores/leaderBoard';
import { ILeaderBoard } from '../types/leaderBoard';

const TabLeaderBoardScreen = () => {
  const dispatch = useDispatch();
  const items = useSelector(leaderBoardItems);
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

  const _renderItem = ({ item, index }: { item: ILeaderBoard; index: number }) => {
    return <LeaderBoardListItem rank={index + 1} item={item} />;
  };

  return (
    <View style={styles.container}>
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
