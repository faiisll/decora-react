import { createApi} from '@reduxjs/toolkit/query/react';
import { setCredentials, setDataUser } from '../authSlice';
import baseQuery from './setupApi';

  export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery,
    tagTypes: ["Teams", "Invitation"],
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (limit = 10) => ({url: '/teams', method: "GET", params: {
                limit
            }}),

        }),
        getTeamsInvitations: builder.query({
            query: () => ({url: '/teams/invitations', method: "GET"}),
            providesTags: ["Invitation"]

        }),
        inviteTeam: builder.mutation({
            query: (body) => ({
                url: "/teams/invite",
                method: "POST",
                body
            }),
            invalidatesTags: ["Invitation"]
        })
    }),
  });
  
  export const { useGetTeamsQuery, useGetTeamsInvitationsQuery, useInviteTeamMutation } = teamApi;
  