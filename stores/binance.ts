import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';

interface IBinancePrice {
  [k: string]: {
    price: number;
  };
}

interface BitcoinState {
  prices: IBinancePrice;
}

const initialState: BitcoinState = {
  prices: {},
};

export const binanceSlice = createSlice({
  name: 'binance',
  initialState,
  reducers: {
    setBinancePrices: (state, action: PayloadAction<IBinancePrice>) => {
      state.prices = action.payload;
    },
  },
});

export const { setBinancePrices } = binanceSlice.actions;

export const fetchGetBinancePrices = (): AppThunk => async (dispatch) => {
  const url = 'https://api.binance.com/api/v3/ticker/price';
  const response = await fetch(url);
  const json: {
    symbol: string;
    price: string;
  }[] = await response.json();

  const obj: IBinancePrice = {};
  json
    .filter((v) => v.symbol.indexOf('BUSD') !== -1 || v.symbol.indexOf('USDT') !== -1)
    .forEach((v) => {
      obj[v.symbol.replace('BUSD', '').replace('USDT', '')] = {
        price: Number(v.price),
      };
    });

  dispatch(setBinancePrices(obj));
};

export const binancePrices = (state: RootState) => state.binance.prices;

export default binanceSlice.reducer;
