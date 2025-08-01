import { combineReducers, configureStore } from "@reduxjs/toolkit";
import offersSlice from "./offersSlice";
import { loanApi } from "@/src/shared/api/service";

const rootReducer = combineReducers({
  offers: offersSlice,
  [loanApi.reducerPath]: loanApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(loanApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
