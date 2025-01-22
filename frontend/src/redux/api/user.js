import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setUser, setLoading } from '../features/userSlice';
import forgotPassword from '../../components/auth/forgotPassword';

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
        uploadAvatar: builder.mutation({ 
            query(body) {
                return {
                    url: "/me/upload_avatar",
                    method: "PUT",
                    body,
                }
            },
            invalidatesTags: ['user'] 
        }),
        updatePassword: builder.mutation({ 
            query(body) {
                return {
                    url: "/password/update",
                    method: "PUT",
                    body,
                }
            },
          
        }),
        forgotPassword: builder.mutation({ 
            query(body) {
                return {
                    url: "/password/forgot",
                    method: "POST",
                    body,
                }
            },
          
        }),
        resetPassword: builder.mutation({ 
            query({token, body}) {
                return {
                    url: `/password/reset/${token}`,
                    method: "PUT",
                    body,
                }
            },
            
        }),
        getAdminUsers: builder.query({
            query: () => `/admin/getAllUsers`,
            providesTags: ['AdminUsers']
        }),

    })
})
export const {
    useGetCurrentUserQuery, 
    useUpdateUserProfileMutation, 
    useUploadAvatarMutation,
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetAdminUsersQuery
} = userApi;