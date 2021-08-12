import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWebSocketData } from '../types/coin.types';
import { AppThunk, RootState } from './index';

export interface ICoinName {
  [k: string]: {
    name: string;
    ticket: string;
  };
}

export interface IPriceItem {
  [k: string]: IWebSocketData;
}

interface PricesState {
  connected: string;
  names: ICoinName;
  item: IPriceItem;
  loading: boolean;
  favoritesNames: string[];
}

const initialState: PricesState = {
  connected: '',
  names: {},
  item: {},
  loading: false,
  favoritesNames: [],
};

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<string>) => {
      state.connected = action.payload;
    },
    setItem: (state, action: PayloadAction<IPriceItem>) => {
      state.item = {
        ...state.item,
        ...action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNames: (state, action: PayloadAction<ICoinName>) => {
      state.names = action.payload;
    },
    setFavoritesNames: (state, action: PayloadAction<string[]>) => {
      state.favoritesNames = action.payload;
    },
  },
});

export const { setConnected, setItem, setLoading, setNames, setFavoritesNames } = coinSlice.actions;

export const upbitConnect = (): AppThunk => async (dispatch) => {
  dispatch(setConnected(new Date().getTime().toString()));
};

export const fetchGetCoinNames = (): AppThunk => async (dispatch) => {
  const url = 'https://api.upbit.com/v1/market/all?isDetails=false';
  const response = await fetch(url);
  const json: {
    english_name: string;
    korean_name: string;
    market: string;
  }[] = await response.json();

  const data: any = {};

  json
    .filter((v) => v.market.indexOf('KRW') !== -1)
    .forEach((v) => {
      data[v.market] = {
        name: v.korean_name,
        ticket: v.market,
      };
    });

  dispatch(setNames(data));
};

export const setFavoriteCoin =
  (name: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const favoritesNames = getState().coin.favoritesNames;
      const copy = favoritesNames.slice().filter((favoritesName) => favoritesName !== name);
      const exist = favoritesNames.find((v) => v === name);

      if (!exist) {
        copy.push(name);
      }

      dispatch(setFavoritesNames(copy));
      await AsyncStorage.setItem('favorites', JSON.stringify(copy));
    } catch (error) {}
  };

export const initFavoriteCoin = (): AppThunk => async (dispatch) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    const json = favorites ? JSON.parse(JSON.stringify(favorites)) : [];
    dispatch(setFavoritesNames(json));
  } catch (error) {
    dispatch(setFavoritesNames([]));
  }
};

export const coin = (state: RootState) => state.coin.item;
export const coinLoading = (state: RootState) => state.coin.loading;
export const coinNames = (state: RootState) => state.coin.names;
export const favoritesCoinNames = (state: RootState) => state.coin.favoritesNames;

export default coinSlice.reducer;
