import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"


import { productApi } from './api/productsApi'
import {authApi} from './api/auth'
import { userApi } from './api/user'

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            [productApi.middleware, 
            authApi.middleware, 
            userApi.middleware]
        )
})