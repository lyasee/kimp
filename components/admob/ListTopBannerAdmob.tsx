import * as React from 'react';
import { useSelector } from 'react-redux';
import { coinListTopBannerAdmob } from '../../stores/admob';
import { AdMobBanner } from 'expo-ads-admob';
import { Platform } from 'react-native';

const ListTopBannerAdmob: React.FC = () => {
  const admob = useSelector(coinListTopBannerAdmob);

  if (Platform.OS === 'ios') {
    return (
      <AdMobBanner bannerSize="smartBannerPortrait" adUnitID={admob.unitId} servePersonalizedAds />
    );
  }

  return <></>;
};

export default ListTopBannerAdmob;
