import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const selectSearchValue = (state) => state.filter.searchValue;
export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSLice.actions;

export default filterSLice.reducer;
