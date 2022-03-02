import { createSlice } from '@reduxjs/toolkit';
const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 'all',
    orderBy: 'relevance',
    currentPage: 0,
  },
  reducers: {
    changeСategory: (state, action) => {
      state.category = action.payload;
    },
    changeorderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    changeCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    resetCurrentPage: (state) => {
        state.currentPage = 0;
      },
  },
  
});
export default filtersSlice.reducer;
export const { changeСategory, changeorderBy, changeCurrentPage, resetCurrentPage } = filtersSlice.actions;