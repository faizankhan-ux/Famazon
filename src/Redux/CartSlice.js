import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const id = item?.id ?? item;
      const exists = state.items.some((i) => (i?.id ?? i) === id);
      if (!exists) {
        state.items.push(item);
      }
    },
    removeItem(state, action) {
      const payload = action.payload;
      const id = payload?.id ?? payload;
      state.items = state.items.filter((item) => (item?.id ?? item) !== id);
    },
    toggle(state, action) {
      const item = action.payload;
      const id = item?.id ?? item;
      const exists = state.items.some((i) => (i?.id ?? i) === id);
      if (exists) {
        state.items = state.items.filter((i) => (i?.id ?? i) !== id);
      } else {
        state.items.push(item);
      }
    },
    clear(state){
      state.items = []
    }
  },
});

export default CartSlice.reducer;
export const { addItem, removeItem, toggle, clear } = CartSlice.actions;

