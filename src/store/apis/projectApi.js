import { createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './setupApi';

  export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery,
    tagTypes: ["Projects", "Phases", "Tasks", "Project", "Activities"],
    endpoints: (builder) => ({
        getProject: builder.query({
            query: (limit = 10, page = 1) => ({url: '/projects', method: "GET", params: {
              limit,
              page
            }}),
            providesTags: ["Projects"]

        }),
        getProjectById: builder.query({
          query: (id) => ({url: `/project/${id}`, method: "GET"}),
          providesTags: ["Project"]
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
          invalidatesTags: ["Phases", "Project"],

        }),
        createTask: builder.mutation({
          query: (body) => ({url: `/task`, method: "POST", body}),
          invalidatesTags: ["Tasks"]

        }),
        getTasks: builder.query({
          query: (projectId) => ({url: `/project/${projectId}/tasks`, method: "GET"}),
          providesTags: ["Tasks"]
        }),
        getChats: builder.query({
          query: (projectId) => ({url: `/project/${projectId}/chats`, method: "GET"}),
        }),
        getDashboard: builder.query({
          query: () => ({url: `/dashboard`, method: "GET"}),
        }),
        getActivities: builder.query({
          query: (taskId = '', limit = 5) => ({url: `/activities`, method: "GET", params: {
            taskId,
            limit
          }}),
          providesTags: ["Activities"]
        }),
        updateTask: builder.mutation({
          query: (params) => ({url: `/project/${params.projectId}/task/${params.taskId}`, method: "PATCH", body: params.body}),
          invalidatesTags: ["Activities", "Tasks"]
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
    useCreateTaskMutation,
    useGetChatsQuery,
    useGetDashboardQuery,
    useGetActivitiesQuery,
    useUpdateTaskMutation
  } = projectApi;
  