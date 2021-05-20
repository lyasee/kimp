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
  connected: boolean;
  names: ICoinName;
  item: IPriceItem;
  loading: boolean;
}

const initialState: PricesState = {
  connected: false,
  names: {},
  item: {},
  loading: false,
};

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
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
  },
});

export const { setConnected, setItem, setLoading, setNames } = coinSlice.actions;

export const upbitConnect = (): AppThunk => async (dispatch) => {
  dispatch(setConnected(true));
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

export const coin = (state: RootState) => state.coin.item;
export const coinLoading = (state: RootState) => state.coin.loading;
export const coinNames = (state: RootState) => state.coin.names;

export default coinSlice.reducer;
