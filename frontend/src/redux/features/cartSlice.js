import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItem: (state, action) => {
      //item from payload
      const item = action.payload;

      // use item from payload to find if item exist
      // if dont exist then add new item to array

      const isItemExist = state.cartItems.find( 
        (i) => { 
            return i.product === item.product
        }
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) => 
           (i.product === isItemExist.product) ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});
export default cartSlice.reducer;

export const { setCartItem } = cartSlice.actions;
