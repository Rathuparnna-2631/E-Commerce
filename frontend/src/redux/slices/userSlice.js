import { URL } from "../../constants/index";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query({
            query: () => ({
                url: URL.products,
            }),
            keepUnusedDataFor: 5,
        }),
        
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;