import { baseApi } from "../../api/baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllblogs: builder.query({
      query: () => {
        let url = "/blog";
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["blogs"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getBlogById: builder.query({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
      transformResponse: (response: any) => response?.data,
    }),
  
    updateBlog: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
    createBlog: builder.mutation({
      query: (formData: FormData) => ({
        url: "/blog",
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetAllblogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
