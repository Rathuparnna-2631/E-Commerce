import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from "../../constants/index";

const baseQuery = fetchBaseQuery({ baseUrl: URL.base_url });

export const apiSlice = createApi({
    baseQuery,
    tagtypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})
});