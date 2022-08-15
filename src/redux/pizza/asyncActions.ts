import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPizzasArgh, Pizza } from './types';

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
