import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';
import axios from 'axios';
import cheerio from 'react-native-cheerio';

interface IBinance {
  price: number;
  openPrice: number;
  priceChangePercent: number;
}

interface IBitcoinRate {
  long: number;
  short: number;
}

interface Bianance {
  btc: number;
  eth: number;
}

interface BitcoinState {
  binance: IBinance;
  rate: IBitcoinRate;
  dominance: Bianance;
}

const initialState: BitcoinState = {
  binance: {
    price: 0,
    openPrice: 0,
    priceChangePercent: 0,
  },
  rate: {
    long: 50,
    short: 50,
  },
  dominance: {
    btc: 0,
    eth: 0,
  },
};

export const bitcoinSlice = createSlice({
  name: 'bitcoin',
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<IBitcoinRate>) => {
      state.rate = action.payload;
    },
    setBinance: (state, action: PayloadAction<IBinance>) => {
      state.binance = action.payload;
    },
    setDominance: (state, action: PayloadAction<Bianance>) => {
      state.dominance = action.payload;
    },
  },
});

export const { setRate, setBinance, setDominance } = bitcoinSlice.actions;

export const fetchGetBitcoinBinance = (): AppThunk => async (dispatch) => {
  try {
    const url = 'https://coinmarketcap.com/charts/';
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const result = $('.cmc-header-desktop > div > div > div > span:nth-child(5)').text();
    const text = result
      .replace(/%/gi, '')
      .replace('Dominance:', '')
      .replace('BTC: ', '')
      .replace('ETH: ', ',')
      .replace(/ /gi, '');
    const [btc, eth] = text.split(',');
    dispatch(setDominance({ btc, eth }));
  } catch (error) {}
};

export const fetchGetBitcoinRate = (): AppThunk => async (dispatch) => {
  const url = 'https://fapi.bybt.com/api/futures/longShortRate?timeType=3&symbol=BTC';
  const response = await fetch(url);
  const json: {
    data: {
      symbol: 'BTC';
      turnoverNumber: number;
      longRate: number;
      longVolUsd: number;
      shortRate: number;
      shortVolUsd: number;
      symbolLogo: string;
      totalVolUsd: number;
      list: {
        exchangeName: string;
        originalSymbol: string;
        symbol: string;
        price: number;
        openPrice: number;
        priceChangePercent: number;
      }[];
    }[];
  } = await response.json();

  if (json.data.length > 0) {
    dispatch(
      setRate({
        long: json.data[0].longRate,
        short: json.data[0].shortRate,
      }),
    );

    if (json.data[0].list.length > 0) {
      const find = json.data[0].list.find((v) => v.exchangeName.toLocaleLowerCase() === 'binance');
      if (find) {
        dispatch(
          setBinance({
            ...find,
          }),
        );
      }
    }
  }
};

export const bitcoinRate = (state: RootState) => state.bitcoin.rate;
export const bitcoinBinance = (state: RootState) => state.bitcoin.binance;
export const bitcoinDominance = (state: RootState) => state.bitcoin.dominance;

export default bitcoinSlice.reducer;
