import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  isFrame: boolean;
};

type fetchPizzasArgh = {
  category: string;
  search: string;
  currentPage: number;
  sortOrder: string;
  sortProperty: string;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  countItems: number;
  status: Status;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: fetchPizzasArgh) => {
    const { category, search, currentPage, sortOrder, sortProperty } = params;

    const { data } = await axios.get(
      `https://62dfc893976ae7460bf39a43.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortProperty}&order=${sortOrder}${search}`,
    );
    return { items: data.items as Pizza[], count: data.count as number };
  },
);

const initialState: PizzaSliceState = {
  items: [],
  countItems: 0,
  status: Status.LOADING,
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
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload.items;
      state.countItems = action.payload.count;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
      state.countItems = 0;
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems, setCountItems } = pizzaSLice.actions;

export default pizzaSLice.reducer;