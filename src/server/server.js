import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, BASE_URL, COMPANY_ID } from "../constants/constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${ACCESS_TOKEN}`);
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `?company_id=${COMPANY_ID}`,
        method: "GET",
      }),
      providesTags: ({results}, error) =>{
       return results
        ? [...results.map(({id}) => ({ type: 'Task', id })),
       
        "Task"
      ]
        :
        ["Task"]
      }
        
    }),

    postTasks: builder.mutation({
      query: (body) => ({
        url: `?company_id=${COMPANY_ID}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"]
      }),
      
      deleteTask: builder.mutation({
        query: (task_id) => ({
          url: `${task_id}?company_id=${COMPANY_ID}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, task_id) => [{ type: 'Task', id: task_id }],
    }),
    getTask: builder.mutation({
      query: (task_id) => ({
        url: `${task_id}?company_id=${COMPANY_ID}`,
        method: "DELETE",
      }),
    }),

    updateTask: builder.mutation({
      query: ({task_id,patch}) => ({
        url: `${task_id}?company_id=${COMPANY_ID}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags:['Task'],
      async onQueryStarted(uniqueIdentifier, { dispatch, queryFulfilled }) {
        dispatch(api.util.resetApiState())
        
        const patchResult = dispatch(
          api.util.updateQueryData(
            'getTasks',
            undefined,
            (Tasks) => {
              return Tasks;
            }
            )
            );

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

          }
          
      },
    }),

  }),
});

export const { useGetTasksQuery, usePostTasksMutation, useDeleteTaskMutation , useUpdateTaskMutation} =api;
