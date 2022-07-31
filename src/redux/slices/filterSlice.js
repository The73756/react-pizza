import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
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
      console.log('reducer', action);
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = filterSLice.actions;

export default filterSLice.reducer;
