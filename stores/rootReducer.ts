import { combineReducers } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import coin from './coin';
import bitcoin from './bitcoin';
import binance from './binance';
import currency from './currency';
import leaderBoard from './leaderBoard';
import admob from './admob';
import { coinSaga } from './coinSaga';

const rootReducer = combineReducers({
  coin,
  bitcoin,
  binance,
  currency,
  leaderBoard,
  admob,
});

export function* rootSaga() {
  yield all([coinSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
