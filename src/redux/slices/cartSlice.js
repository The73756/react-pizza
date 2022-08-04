import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/cartTotalPrice';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSLice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    plusItem(state, action) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      //если елемент последний или мы полностью удаляем айтем
      if (findItem && (findItem.count === 1 || action.payload.isFullRemove)) {
        state.items = state.items.filter((obj) => obj.id !== findItem.id);
      } else if (findItem && findItem.count > 1) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { plusItem, minusItem, clearItems } = cartSLice.actions;

export default cartSLice.reducer;
