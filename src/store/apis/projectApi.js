import { createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './setupApi';

  export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery,
    tagTypes: ["Projects", "Phases", "Tasks"],
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
        }),
        getPhases: builder.query({
          query: (projectId) => ({url: `/project/${projectId}/phases`, method: "GET"}),
          providesTags: ["Phases"]
        }),
        createPhase: builder.mutation({
          query: (body) => ({url: `/phase`, method: "POST", body}),
          invalidatesTags: ["Phases"]

        }),
        createTask: builder.mutation({
          query: (body) => ({url: `/task`, method: "POST", body}),
          invalidatesTags: ["Tasks"]

        }),
        getTasks: builder.query({
          query: (projectId) => ({url: `/project/${projectId}/tasks`, method: "GET"}),
          providesTags: ["Tasks"]
        })
    }),
  });
  
  export const {
    useGetProjectQuery, 
    useGetProjectByIdQuery, 
    useCreateProjectMutation, 
    useDeleteProjectMutation ,
    useGetPhasesQuery,
    useGetTasksQuery,
    useCreatePhaseMutation,
    useCreateTaskMutation
  } = projectApi;
  