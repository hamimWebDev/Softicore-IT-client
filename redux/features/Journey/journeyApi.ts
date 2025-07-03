import { baseApi } from "../../api/baseApi";

const journeyApi = baseApi.injectEndpoints({
    endpoints: (builder: any) => ({
        getAllJourneys: builder.query({
            query: () => {
                let url = "/journey";
                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: ["journey s"],
            transformResponse: (response: any) => {
                return response?.data;
            },
        }),
        getSingleJourney: builder.query({
            query: (id: string) => ({
                url: `/journey/${id}`,
                method: "GET",
            }),
            providesTags: ["journey s"],
            transformResponse: (response: any) => response?.data,
        }),
        addExperience: builder.mutation({
            query: (formData: FormData) => ({
                url: "/journey/experience",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["journey s"],
        }),
        addSkill: builder.mutation({
            query: (formData: FormData) => ({
                url: "/journey/skill",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["journey s"],
        }),
        addEducation: builder.mutation({
            query: (formData: FormData) => ({
                url: "/journey/education",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["journey s"],
        }),
        updateJourney: builder.mutation({
            query: ({ id, formData }: { id: string; formData: FormData }) => ({
                url: `/journey/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["journey s"],
        }),
        deleteJourney: builder.mutation({
            query: (id: string) => ({
                url: `/journey/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["journey s"],
        }),
    }),
});

export const {
    useGetAllJourneysQuery,
    useGetSingleJourneyQuery,
    useAddExperienceMutation,
    useAddSkillMutation,
    useAddEducationMutation,
    useUpdateJourneyMutation,
    useDeleteJourneyMutation,
} = journeyApi;
