import { createSlice } from '@reduxjs/toolkit';
const currentBookSlice = createSlice({
  name: 'currentBook',
  initialState: {
   currentBookData: '',
  },
  reducers: {
    fillCurrentBook: (state, action) => {
      state.currentBookData = action.payload;
    },
  },
});
export default currentBookSlice.reducer;
export const { fillCurrentBook } = currentBookSlice.actions;