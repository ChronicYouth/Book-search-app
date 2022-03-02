import { createSlice } from '@reduxjs/toolkit';
const booksSlice = createSlice({
  name: 'books',
  initialState: {
   booksData: [],
  },
  reducers: {
    fillBooks: (state, action) => {
      state.booksData = action.payload;
    },
    add: (state, action) => {
        state.booksData =  [...state.booksData, ...action.payload] 
    }
  },
  
});
export default booksSlice.reducer;
export const { fillBooks, add } = booksSlice.actions;