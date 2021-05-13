import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';

interface ICurrency {
  code: string;
  currencyCode: string; // "USD",
  currencyName: string; // "달러",
  country: string; // "미국",
  name: string; // "미국 (KRW/USD)",
  date: string; // "2021-05-13",
  time: string; // "15:05:03",
  basePrice: number; // 1130.8,
  openingPrice: number; // 1123.5,
  highPrice: number; // 1133,
  lowPrice: number; // 1123.5,
  change: string; // "RISE",
}

interface BitcoinState {
  usd: ICurrency;
}

const initialState: BitcoinState = {
  usd: {
    code: 'FRX.KRWUSD',
    currencyCode: 'USD',
    currencyName: '달러',
    country: '미국',
    name: '미국 (KRW/USD)',
    date: '',
    time: '',
    basePrice: 0,
    openingPrice: 0,
    highPrice: 0,
    lowPrice: 0,
    change: '',
  },
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencyUSD: (state, action: PayloadAction<ICurrency>) => {
      state.usd = action.payload;
    },
  },
});

export const { setCurrencyUSD } = currencySlice.actions;

export const fetchGetCurrency = (): AppThunk => async (dispatch) => {
  const url = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
  const response = await fetch(url);
  const json: ICurrency[] = await response.json();

  const usd = json.find((v) => v.code === 'FRX.KRWUSD');

  if (usd) {
    dispatch(setCurrencyUSD(usd));
  }
};

export const currencyUSD = (state: RootState) => state.currency.usd;

export default currencySlice.reducer;
