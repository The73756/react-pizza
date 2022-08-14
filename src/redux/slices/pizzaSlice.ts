import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  isFrame: boolean;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: Record<string, string>) => {
    const { category, search, currentPage, sortOrder, sortProperty } = params;

    const { data } = await axios.get(
      `https://62dfc893976ae7460bf39a43.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortProperty}&order=${sortOrder}${search}`,
    );
    return { items: data.items as Pizza[], count: data.count as number };
  },
);

interface PizzaSliceState {
  items: Pizza[];
  countItems: number;
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  countItems: 0,
  status: 'loading',
};

const pizzaSLice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
    setCountItems(state, action) {
      state.countItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload.items;
      state.countItems = action.payload.count;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
      state.countItems = 0;
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems, setCountItems } = pizzaSLice.actions;

export default pizzaSLice.reducer;
