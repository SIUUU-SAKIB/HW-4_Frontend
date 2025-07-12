
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface PaginationState {
  currentPage: number;
  limit: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  limit: 8,
};


const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});


export const { previousPage, nextPage, setPage } = paginationSlice.actions;
export default paginationSlice.reducer;
