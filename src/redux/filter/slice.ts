import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSortFromLS } from '../../utils/getSortFromLS';
import { getCategoryIdFromLS } from '../../utils/getCategoryIdFromLS';
import { FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: getCategoryIdFromLS(),
  currentPage: 1,
  sort: getSortFromLS(),
};

const filterSLice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSLice.actions;

export default filterSLice.reducer;
