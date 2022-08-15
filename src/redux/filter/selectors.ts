import { RootState } from "../store";

export const selectSearchValue = (state: RootState) => state.filter.searchValue;
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
