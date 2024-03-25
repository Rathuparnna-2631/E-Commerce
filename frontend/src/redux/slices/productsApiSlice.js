import { URL } from "../../constants/index";
import { apiSlice } from "./apiSlice";
console.log(URL.products,URL.users);
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: URL.products,
                
            }),

            keepUnusedDataFor: 5,
        }),
        
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${URL.products}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        })
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;