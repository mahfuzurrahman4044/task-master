import { baseApi } from "../api/baseApi";

const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => "/tasks",
            providesTags: ["Tasks"]
        }),
        getTaskByName: builder.query({
            query: (name) => `/tasks/${name}`,
            providesTags: ["Tasks"]
        }),
        getUpdatePost: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ["Tasks"]
        }),
        getPost: builder.mutation({
            query: (tasks) => ({
                url: "/tasks",
                method: 'POST',
                body: tasks,
            }),
            invalidatesTags: ["Tasks"]
        }),
        getDelete: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Tasks"]
        })
    })
})

export const { useGetTaskQuery, useGetTaskByNameQuery, useGetPostMutation, useGetUpdatePostMutation, useGetDeleteMutation } = taskApi