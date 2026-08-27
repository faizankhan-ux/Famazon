import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shopSlice",
  initialState: {
    value: [],

  },
  reducers: {
    update(state, action) {
      state.value = action.payload;
    },
  },
});

export default shopSlice.reducer;
export const { update } = shopSlice.actions;