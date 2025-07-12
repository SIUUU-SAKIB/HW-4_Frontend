import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/bookSlice/bookApi";
import formReducer from "./features/formSlice"
import paginationReducer from "./features/bookSlice/paginationSlice"
const store = configureStore({
    reducer: {
        pagination: paginationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        form : formReducer
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;