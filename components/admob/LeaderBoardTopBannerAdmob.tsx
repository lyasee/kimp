import * as React from 'react';
import { useSelector } from 'react-redux';
import { leaderBoardTopBannerAdmob } from '../../stores/admob';
import { AdMobBanner } from 'expo-ads-admob';
import { Platform } from 'react-native';

const LeaderBoardTopBannerAdmob: React.FC = () => {
  const admob = useSelector(leaderBoardTopBannerAdmob);

  if (Platform.OS === 'ios') {
    return (
      <AdMobBanner bannerSize="smartBannerPortrait" adUnitID={admob.unitId} servePersonalizedAds />
    );
  }

  return <></>;
};

export default LeaderBoardTopBannerAdmob;
