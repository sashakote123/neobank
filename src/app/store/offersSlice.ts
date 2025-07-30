import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOfferItem, IOffersState } from "@/src/shared/types/types";

const initialState: IOffersState = {
  offersArray: null,
  currentOffer: localStorage.getItem("currentOffer")
    ? JSON.parse(localStorage.getItem("currentOffer")!)
    : null,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    updateArray: (state, action: PayloadAction<IOfferItem[] | null>) => {
      state.offersArray = action.payload;
    },
    updateCurrentOffer: (state, action: PayloadAction<IOfferItem | null>) => {
      state.currentOffer = action.payload;
    },
  },
});

export const { updateArray, updateCurrentOffer } = offersSlice.actions;
export default offersSlice.reducer;
