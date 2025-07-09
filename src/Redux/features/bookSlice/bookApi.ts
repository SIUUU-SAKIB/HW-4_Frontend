import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL
    }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books"
        }), getBooksById: builder.query({
            query: (id) => `/books/${id}`
        }),
        submitForm: builder.mutation({
            query: (data) => ({
                url: "/create-book",
                method: "POST",
                body: data
            })
        })
    })
})

export const { useGetBooksQuery, useGetBooksByIdQuery, useSubmitFormMutation } = apiSlice