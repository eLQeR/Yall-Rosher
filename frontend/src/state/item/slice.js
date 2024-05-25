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
      const { itemData, variantId } = action.payload;
      const variant = itemData.sizes.find((item) => item.id === variantId);

      state.cartItems.push({
        id: itemData.id,
        image: itemData.images[0].image,
        price: itemData.price,
        name: itemData.name,
        size: variant.size,
        color: variant.color.color,
      });

      state.cartItemIds.push(variantId);
    }),
    removeFromCart: create.reducer((state, action) => {
      const variantId = action.payload;

      const index = state.cartItemIds.indexOf(variantId);

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
