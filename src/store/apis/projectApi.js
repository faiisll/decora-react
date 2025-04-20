import { createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './setupApi';

  export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery,
    tagTypes: ["Projects"],
    endpoints: (builder) => ({
        getProject: builder.query({
            query: () => ({url: '/projects', method: "GET"}),
            providesTags: ["Projects"]

        }),
        getProjectById: builder.query({
          query: (id) => ({url: `/project/${id}`, method: "GET"})
        }),
        createProject: builder.mutation({
          query: (body) => ({url: "/project", method: "POST", body}),
          invalidatesTags: ["Projects"]
        }),
        deleteProject: builder.mutation({
          query: (id) => ({url: "/project/"+id, method: "DELETE"}),
          invalidatesTags: ["Projects"]
        })
    }),
  });
  
  export const { useGetProjectQuery, useGetProjectByIdQuery, useCreateProjectMutation, useDeleteProjectMutation } = projectApi;
  