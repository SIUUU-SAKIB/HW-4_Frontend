import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/bookSlice/bookApi";
import formReducer from "./features/formSlice"
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        form : formReducer
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;