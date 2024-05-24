import { createSlice } from '@reduxjs/toolkit';
import { userSlice } from '../user';

export const initialState = {
  cartItems: [],
  cartItemIds: [],
};

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: (create) => ({
    addToCart: create.reducer((state, action) => {
      const { itemData, sizeId } = action.payload;
      state.cartItems.push({
        id: itemData.id,
        image: itemData.images[0].image,
        price: itemData.price,
        name: itemData.name,
        item: itemData.sizes[sizeId],
      });

      state.cartItemIds.push(itemData.sizes[sizeId].id);
    }),
    removeFromCart: create.reducer((state, action) => {
      const sizeId = action.payload;
      const index = state.cartItemIds.indexOf(sizeId);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
        state.cartItemIds.splice(index, 1);
      }
    }),
    clearCart: create.reducer((state) => {
      state.cartItemIds = [];
      state.cartItems = [];
    }),
  }),
  extraReducers: (builder) => ({
    logout: builder.addCase(userSlice.actions.logout, (state) => {
      state.cartItems = [];
      state.cartItemIds = [];
    }),
  }),
});

export const itemReducer = itemSlice.reducer;
export const { clearCart, addToCart, removeFromCart } = itemSlice.actions;
