import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
    currentPage: 1,
    limit: 8
}
const paginationSlice = createSlice({
    name: "pagination",
    initialState
    , reducers: {
        previousPage: (state) => {
            if (state.currentPage) state.currentPage -= 1
        },
        nextPage: (state) => {
            state.currentPage += 1
        },
        setPage: (state, action) => {
            state.currentPage = action.payload
        },
        reset: (state) => {

        }
    }
})
export const { previousPage, nextPage, setPage } = paginationSlice.actions;
export default paginationSlice.reducer