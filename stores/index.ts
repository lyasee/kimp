import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

export const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
