import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { currencyApi } from '@/src/entities/currency/api/service';
import { loanApi } from '@/src/shared/api/service';

import offersSlice from './offersSlice';

const rootReducer = combineReducers({
  offers: offersSlice,
  [loanApi.reducerPath]: loanApi.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(loanApi.middleware).concat(currencyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
