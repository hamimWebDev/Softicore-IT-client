import { baseApi } from "../../api/baseApi";
import { ITeam } from "../../../types/team.types";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllTeamMembers: builder.query({
      query: () => {
        let url = "/team";
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["team"],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    getTeamMemberById: builder.query({
      query: (id: string) => ({
        url: `/team/${id}`,
        method: "GET",
      }),
      providesTags: (result: any, error: any, id: string) => [{ type: "team", id }],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    createTeamMember: builder.mutation({
      query: (formData: FormData) => ({
        url: "/team",
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["team"],
    }),
    updateTeamMember: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/team/${id}`,
        method: "PUT",
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["team"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id: string) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["team"],
    }),
  }),
});

export const {
  useGetAllTeamMembersQuery,
  useGetTeamMemberByIdQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
