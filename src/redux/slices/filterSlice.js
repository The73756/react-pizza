import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    id: 0,
    name: 'популярности',
    reverseIcon: true,
    sortProperty: 'rating',
    order: 'desc',
  },
};

const filterSLice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSLice.actions;

export default filterSLice.reducer;
