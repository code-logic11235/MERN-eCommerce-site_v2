import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    tagTypes: ['Product', "AdminProducts"],
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
        getAdminProducts: builder.query({
            query: () => `/admin/products`,
            providesTags: ["AdminProducts"]
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: `/admin/products`,
                method: "POST",
                body,
                
            }),
            invalidatesTags: ['AdminProducts']
            
        }),
        updateProduct: builder.mutation({
            query: ({id, body}) => ({
                url: `/admin/products/${id}`,
                method: "PUT",
                body
                
            }),
            invalidatesTags: ['product','AdminProducts']
            
        }),
        uploadProductImages: builder.mutation({
            query: ({id, body}) => ({
                url: `/admin/products/${id}/upload_images`,
                method: "PUT",
                body
                
            }),
            invalidatesTags: ['Product']
            
        }),
        deleteProductImage: builder.mutation({
            query: ({id, body}) => ({
                url: `/admin/products/${id}/delete_image`,
                method: "PUT",
                body
                
            }),
            invalidatesTags: ['Product']
            
        }),
        

    })
})
export const {
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useSubmitReviewMutation, 
    useCanUserReviewQuery,
    useGetAdminProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImagesMutation,
    useDeleteProductImageMutation
} = productApi;