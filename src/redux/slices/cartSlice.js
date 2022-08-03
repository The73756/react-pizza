import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSLice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = cartSLice.actions;

export default cartSLice.reducer;
