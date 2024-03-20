import { URL } from "../../constants/index";
import { apiSlice } from "./apiSlice";
console.log(URL.users);
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${URL.users}/login`,
                method:'POST',
                body: data,
            }),
        }),    
    }),
});

export const { useLoginMutation} = usersApiSlice;