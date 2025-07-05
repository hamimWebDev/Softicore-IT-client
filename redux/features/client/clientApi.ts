import { baseApi } from "../../api/baseApi";
import { IClient } from "../../../types/client.types";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllClients: builder.query({
      query: () => {
        let url = "/client";
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["client"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getClientById: builder.query({
      query: (id: string) => ({
        url: `/client/${id}`,
        method: "GET",
      }),
      providesTags: (result: any, error: any, id: string) => [{ type: "client", id }],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    createClient: builder.mutation({
      query: (formData: FormData) => ({
        url: "/client",
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["client"],
    }),
    updateClient: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/client/${id}`,
        method: "PUT",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["client"],
    }),
    deleteClient: builder.mutation({
      query: (id: string) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
