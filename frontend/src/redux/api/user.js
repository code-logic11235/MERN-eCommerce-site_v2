import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setUser, setLoading } from '../features/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    tagTypes: ["user"], // use to manage and invalidate/ refetch parts of cache
    endpoints: (builder) => ({
        getCurrentUser: builder.query({ // use for get request. post,put,delete will use builder.mutation
            query: () => "/me",
        
                transformResponse: (result) => result.user, // if we dont add this line then on line 15 we have to use data.user. this line transform the data data
                async onQueryStarted(args, {dispatch, queryFulfilled}){
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(setUser(data));
                        dispatch(setIsAuthenticated(true))
                        dispatch(setLoading(false))
                    }catch(error){
                        dispatch(setLoading(false))
                        console.log(error)
                    }
                },
                providesTags: ["user"], // define which data is being "provided" or cached by that endpoint
        }),
        updateUserProfile: builder.mutation({ 
            query(body) {
                return {
                    url: "/me/updateProfile",
                    method: "PUT",
                    body,
                }
            },
            invalidatesTags: ['user'] //specify which parts of the cache should be invalidated when certain actions occur, 
            //such as creating, updating, or deleting data. this will re fetch new data
        }),

    })
})
export const {useGetCurrentUserQuery, useUpdateUserProfileMutation} = userApi;