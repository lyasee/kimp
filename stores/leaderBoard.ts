import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IByBtLeaderBoardResponse, ILeaderBoard } from '../types/leaderBoard';
import { AppThunk, RootState } from './index';

interface LeaderBoardState {
  items: ILeaderBoard[];
}

const initialState: LeaderBoardState = {
  items: [],
};

export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ILeaderBoard[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = leaderBoardSlice.actions;

export const fetchGetLeaderBoards = (): AppThunk => async (dispatch) => {
  const url = 'https://fapi.coinglass.com/api/bitmex/leaderboard';
  const response = await fetch(url);
  const res: IByBtLeaderBoardResponse = await response.json();
  dispatch(setItems(res.data.list));
};

export const leaderBoardItems = (state: RootState) => state.leaderBoard.items;

export default leaderBoardSlice.reducer;
