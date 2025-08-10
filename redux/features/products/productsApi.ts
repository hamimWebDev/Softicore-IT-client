import { baseApi } from "../../api/baseApi";
import { IWork, ICreateWorkRequest } from "../../../types/work.types";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<IWork[], void>({
      query: () => {
        let url = "/work";
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["products"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getProductById: builder.query({
      query: (id: string) => ({
        url: `/work/${id}`,
        method: "GET",
      }),
      providesTags: (result: any, error: any, id: string) => [{ type: "products", id }],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    createProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/work",
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/work/${id}`,
        method: "PUT",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/work/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
