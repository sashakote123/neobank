import { configureStore } from "@reduxjs/toolkit";
import offersSlice from "./offersSlice";

export const store = configureStore({
  reducer: {
    offers: offersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
