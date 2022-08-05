import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [123],
  countItems: 0,
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
});

export const { setItems, setCountItems } = pizzaSLice.actions;

export default pizzaSLice.reducer;
