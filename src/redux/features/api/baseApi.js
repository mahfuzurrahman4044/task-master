import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://task-master-server-mahfuzur-rahman.vercel.app' }),
    tagTypes: ["Tasks"],
    endpoints: () => ({}),
})