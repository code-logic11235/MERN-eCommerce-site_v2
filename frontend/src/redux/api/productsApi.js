import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    endpoints: (builder) => ({
        getProducts: builder.query({ // use for get request. post,put,delete will use builder.mutation
            query: (params) => ({
                    url:  "/products",
                    params: {
                        page: params?.page,
                        keyword: params?.keyword,
                        "price[gte]": params.min,
                        "price[lte]": params.max
                    }
                }),
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`
        })

    })
})
export const {useGetProductsQuery, useGetProductDetailsQuery} = productApi;