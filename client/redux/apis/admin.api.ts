import { APP_URL } from "@/constants/config"
import { ADD_ABOUT_REQUEST, ADD_EXPERIENCE_REQUEST, ADD_PROJECT_REQUEST, ADD_SKILLS_REQUEST, COMMON_RESPONSE, DELETE_ABOUT_REQUEST, DELETE_EXPERIENCE_REQUEST, DELETE_PROJECT_REQUEST, DELETE_SKILLS_REQUEST, GET_EXPERIENCE_RESPONSE, GET_PROJECT_RESPONSE, GET_SKILLS_RESPONSE, READ_ABOUT_INFO_RESPONSE, UPDATE_ABOUT_REQUEST, UPDATE_EXPERIENCE_REQUEST, UPDATE_PROJECT_REQUEST, UPDATE_SKILLS_REQUEST } from "@/types/admin"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/admin`, credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getSkills: builder.query<GET_SKILLS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-skills",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),

            addSkills: builder.mutation<COMMON_RESPONSE, ADD_SKILLS_REQUEST>({
                query: skillData => {
                    return {
                        url: "/add-skills",
                        method: "POST",
                        body: skillData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            updateSkills: builder.mutation<COMMON_RESPONSE, UPDATE_SKILLS_REQUEST>({
                query: skillData => {
                    return {
                        url: "/update-skills/" + skillData._id,
                        method: "PATCH",
                        body: skillData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            deleteSkills: builder.mutation<COMMON_RESPONSE, DELETE_SKILLS_REQUEST>({
                query: skillData => {
                    return {
                        url: "/delete-skills/" + skillData._id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),



            getExperience: builder.query<GET_EXPERIENCE_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-experience",
                        method: "GET",
                    }
                },
                providesTags: ["admin"]
            }),

            addExperience: builder.mutation<COMMON_RESPONSE, ADD_EXPERIENCE_REQUEST>({
                query: experienceData => {
                    return {
                        url: "/add-experience",
                        method: "POST",
                        body: experienceData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            updateExperience: builder.mutation<COMMON_RESPONSE, UPDATE_EXPERIENCE_REQUEST>({
                query: experienceData => {
                    return {
                        url: "/update-experience/" + experienceData._id,
                        method: "PATCH",
                        body: experienceData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            deleteExperience: builder.mutation<COMMON_RESPONSE, DELETE_EXPERIENCE_REQUEST>({
                query: experienceData => {
                    return {
                        url: "/delete-experience/" + experienceData._id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),



            getProjects: builder.query<GET_PROJECT_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-projects",
                        method: "GET",
                    }
                },
                providesTags: ["admin"]
            }),

            addProject: builder.mutation<COMMON_RESPONSE, ADD_PROJECT_REQUEST>({
                query: projectData => {
                    return {
                        url: "/add-project",
                        method: "POST",
                        body: projectData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            updateProject: builder.mutation<COMMON_RESPONSE, UPDATE_PROJECT_REQUEST>({
                query: projectData => {
                    return {
                        url: "/update-project/" + projectData._id,
                        method: "PATCH",
                        body: projectData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            deleteProject: builder.mutation<COMMON_RESPONSE, DELETE_PROJECT_REQUEST>({
                query: projectData => {
                    return {
                        url: "/delete-project/" + projectData._id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),



            readAboutInfo: builder.query<READ_ABOUT_INFO_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/read-about-info",
                        method: "GET",
                    }
                },
                providesTags: ["admin"]
            }),

            addAboutInfo: builder.mutation<COMMON_RESPONSE, ADD_ABOUT_REQUEST>({
                query: aboutData => {
                    return {
                        url: "/add-about-info",
                        method: "POST",
                        body: aboutData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            updateAboutInfo: builder.mutation<COMMON_RESPONSE, UPDATE_ABOUT_REQUEST>({
                query: aboutData => {
                    return {
                        url: "/update-about-info/" + aboutData._id,
                        method: "PATCH",
                        body: aboutData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            deleteAboutInfo: builder.mutation<COMMON_RESPONSE, DELETE_ABOUT_REQUEST>({
                query: aboutData => {
                    return {
                        url: "/delete-about-info/" + aboutData._id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const {

} = adminApi
