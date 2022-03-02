import { createSlice } from '@reduxjs/toolkit';
const requestSlice = createSlice({
  name: 'request',
  initialState: {
   requestData: '',
  },
  reducers: {
    fillRequest: (state, action) => {
      state.requestData = action.payload;
    },
  },
});
export default requestSlice.reducer;
export const { fillRequest } = requestSlice.actions;