import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/cartTotalPrice';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  imageUrl: string;
  count: number;
  typeFactor: number;
  sizeFactor: number;
  isFullRemove?: boolean;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSLice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //не знаю как избавиться от дублирования кода в поиске элемента :(
    plusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      //если елемент последний или мы полностью удаляем айтем
      if (findItem && (findItem.count === 1 || action.payload.isFullRemove)) {
        state.items = state.items.filter((obj) => obj !== findItem);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.filter((item) => item.id === id);
export const { plusItem, minusItem, clearItems } = cartSLice.actions;

export default cartSLice.reducer;
