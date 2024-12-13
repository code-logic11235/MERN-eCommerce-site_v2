import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import cartReducer from './features/cartSlice'


import { productApi } from './api/productsApi'
import {authApi} from './api/auth'
import { userApi } from './api/user'
import {orderApi} from './api/order'

export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
            productApi.middleware, 
            authApi.middleware, 
            userApi.middleware,
            orderApi.middleware,
        ]
        )
})