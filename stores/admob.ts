import { createSlice } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import { RootState } from './index';

interface AdmobSlot {
  name: string;
  unitId: string;
  count: number;
}

interface AdmobState {
  coinListTopBannerAdmob: AdmobSlot;
  leaderBoardTopBannerAdmob: AdmobSlot;
  leaderBoardLinkAdmob: AdmobSlot;
  dominanceBoxAdmob: AdmobSlot;
  twitterTabAdmob: AdmobSlot;
}

const isDev = __DEV__;

const initialState: AdmobState = {
  coinListTopBannerAdmob: {
    name: '코인 목록 상단 배너',
    unitId: isDev
      ? 'ca-app-pub-3940256099942544/2934735716'
      : Platform.OS === 'ios'
      ? 'ca-app-pub-8271789671155671/3479197270'
      : '',
    count: 0,
  },
  leaderBoardTopBannerAdmob: {
    name: '리더보드 상단 배너',
    unitId: isDev
      ? 'ca-app-pub-3940256099942544/2934735716'
      : Platform.OS === 'ios'
      ? 'ca-app-pub-8271789671155671/8475345410'
      : '',
    count: 0,
  },
  leaderBoardLinkAdmob: {
    name: '리더보드 차트 링크',
    unitId: isDev
      ? 'ca-app-pub-3940256099942544/4411468910'
      : Platform.OS === 'ios'
      ? 'ca-app-pub-8271789671155671/4642243316'
      : '',
    count: 0,
  },
  dominanceBoxAdmob: {
    name: '도미넌스 차트 화면 이동 전',
    unitId: isDev
      ? 'ca-app-pub-3940256099942544/4411468910'
      : Platform.OS === 'ios'
      ? 'ca-app-pub-8271789671155671/6041781436'
      : '',
    count: 0,
  },
  twitterTabAdmob: {
    name: '트위터 탭 이동 시',
    unitId: isDev
      ? 'ca-app-pub-3940256099942544/4411468910'
      : Platform.OS === 'ios'
      ? 'ca-app-pub-8271789671155671/5800773122'
      : '',
    count: 0,
  },
};

export const admobSlice = createSlice({
  name: 'admob',
  initialState,
  reducers: {
    setIncrementDominanceAdmobCount: (state) => {
      state.dominanceBoxAdmob = {
        ...state.dominanceBoxAdmob,
        count: state.dominanceBoxAdmob.count + 1,
      };
    },
    setIncrementTwitterTabAdmobCount: (state) => {
      state.twitterTabAdmob = {
        ...state.twitterTabAdmob,
        count: state.twitterTabAdmob.count + 1,
      };
    },
  },
});

export const { setIncrementDominanceAdmobCount, setIncrementTwitterTabAdmobCount } =
  admobSlice.actions;

export const coinListTopBannerAdmob = (state: RootState) => state.admob.coinListTopBannerAdmob;
export const leaderBoardTopBannerAdmob = (state: RootState) =>
  state.admob.leaderBoardTopBannerAdmob;
export const leaderBoardLinkAdmob = (state: RootState) => state.admob.leaderBoardLinkAdmob;
export const dominanceBoxAdmob = (state: RootState) => state.admob.dominanceBoxAdmob;
export const activeDominanceBoxAdmob = (state: RootState) => {
  return !state.admob.dominanceBoxAdmob.count || state.admob.dominanceBoxAdmob.count % 2 === 0;
};
export const twitterTabAdmob = (state: RootState) => state.admob.twitterTabAdmob;
export const activeTwitterTabAdmob = (state: RootState) => {
  return !state.admob.twitterTabAdmob.count || state.admob.twitterTabAdmob.count % 3 === 0;
};

export default admobSlice.reducer;
