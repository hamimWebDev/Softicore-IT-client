import { baseApi } from "../../api/baseApi";
import { IUser } from "../../../types/user.types";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo: any) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
        }),
       
        // create admin
        createAdmin: builder.mutation({
            query: (adminInfo: any) => ({
                url: '/auth/signup',
                method: 'POST',
                body: adminInfo,
            }),
        }),
        getSingleUser: builder.query<IUser, string>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
        }),
       
    }),
})

export const { useLoginMutation, useGetSingleUserQuery, useCreateAdminMutation} = authApi;
