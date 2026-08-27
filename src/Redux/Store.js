import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "./ShopSlice"
import cartSlice from "./CartSlice"
import SearchSlice from "./SearchSlice"


const store = configureStore({
  reducer: {
    shop: shopSlice,
    cart: cartSlice,
    search: SearchSlice,
  },
});


export default store