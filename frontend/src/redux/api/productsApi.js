import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({ // use for get request. post,put,delete will use builder.mutation
            query: (params) => ({
                    url:  "/products",
                    params: {
                        page: params?.page,
                        keyword: params?.keyword,
                        "price[gte]": params.min,
                        "price[lte]": params.max,
                        category: params?.category,
                        "ratings[gte]": params.ratings,
                    }
                }),
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
            providesTags:['Product']
        }),
        submitReview: builder.mutation({
            query: (body) => ({
                url: "reviews",
                method: "PUT",
                body
            }),
            invalidatesTags: ['Product'],
        }),
        canUserReview: builder.query({
            query: (productId) => `/can_Review/?productId=${productId}`,
            
        }),
        

    })
})
export const {useGetProductsQuery, useGetProductDetailsQuery, useSubmitReviewMutation, useCanUserReviewQuery} = productApi;