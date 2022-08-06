import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, search, currentPage, sortOrder, sortProperty } = params;

  const { data } = await axios.get(
    `https://62dfc893976ae7460bf39a43.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortProperty}&order=${sortOrder}${search}`,
  );
  return { items: data.items, count: data.count };
});

const initialState = {
  items: [],
  countItems: 0,
  status: 'loading', // loading | success | error
};

const pizzaSLice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setCountItems(state, action) {
      state.countItems = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload.items;
      state.countItems = action.payload.count;
    },

    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
      state.countItems = 0;
    },
  },
});

export const { setItems, setCountItems } = pizzaSLice.actions;

export default pizzaSLice.reducer;