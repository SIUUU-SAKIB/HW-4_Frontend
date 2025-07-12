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
        }),
        editBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/edit-book/${id}`,
                method: "PATCH",
                body: data
            })
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete-book/${id}`,
                method: "DELETE"
            })
        }),
        postBorrowedBook: builder.mutation({
            query: (data) => ({
                url: `/borrow`,
                method: "POST",
                body: data
            })
        }),
        borrowedBooks: builder.query({
            query: (id) => `/borrow-book/${id}`
        }),
        borrowSummary: builder.query({
            query: () => "/borrow-summary"
        }),
        getPaginatedBooks: builder.query({
            query: ({ page = 1, limit = 8 }) => `/books/page?page=${page}&limit=${limit}`
        })

    })
})

export const { useGetBooksQuery, useGetBooksByIdQuery, useSubmitFormMutation, useEditBookMutation, useDeleteBookMutation, useBorrowedBooksQuery, usePostBorrowedBookMutation, useBorrowSummaryQuery, useGetPaginatedBooksQuery } = apiSlice