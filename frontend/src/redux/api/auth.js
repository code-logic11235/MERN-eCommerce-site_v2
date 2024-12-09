import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { userApi } from './user';
import { setIsAuthenticated, setUser } from '../features/userSlice';



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    endpoints: (builder) => ({
        // mutations are for put post delete 
        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: "POST",
                    body

                }
            },
            // onqueryStarted lets you run another query consecutively. in theis case calls the getcurrentUser api to set currentUser
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getCurrentUser.initiate(null)); // use initiate to pass parameters

                }catch(e){
                    console.log(e)
                }
            }
        }),
        registerUser: builder.mutation({
            query(body) {
                return {
                    url: "/register",
                    method: "POST",
                    body

                }
            }
        }),
        logout: builder.mutation({
            query(body) {
                return {
                    url: "/logout",
                    method: "POST",
                    body

                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                
                try {
                    await queryFulfilled;
                    await dispatch(setUser(null));
                    await dispatch(setIsAuthenticated(false));

                }catch(e){
                    console.log(e)
                }
            }
        }),



    })
})
export const {
    useLoginMutation, 
    useRegisterUserMutation, 
    useLogoutMutation,
    
} = authApi;