import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setUser } from '../features/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    endpoints: (builder) => ({
        getCurrentUser: builder.query({ // use for get request. post,put,delete will use builder.mutation
            query: () => "/me",
        
                transformResponse: (result) => result.user, // if we dont add this line then on line 15 we have to use data.user. this line transform the data data
                async onQueryStarted(args, {dispatch, queryFulfilled}){
                    try {
                        const {data} = await queryFulfilled;
                        dispatch(setUser(data));
                        dispatch(setIsAuthenticated(true))
                    }catch(error){
                        console.log(error)
                    }
                }
        })

    })
})
export const {useGetCurrentUserQuery} = userApi;