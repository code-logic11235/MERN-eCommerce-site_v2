import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    tagTypes: ['Product', "AdminProducts","Reviews"],
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
        deleteProduct: builder.mutation({
            query(id) {
              return {
                url: `/admin/products/${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: ["AdminProducts"],
          }),
          getProductReviews: builder.query({
            query: (productId) => `/reviews?Id=${productId}`,
            providesTags: ["Reviews"]
           
        }),
        deleteReview: builder.mutation({
            query({productId, id}) {
              return {
                url: `/admin/reviews?productId=${productId}&Id=${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: ['Reviews']
            
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
    useDeleteProductImageMutation,
    useDeleteProductMutation, // use is to load that when the component is rendered 
    useLazyGetProductReviewsQuery, // lazy is used to defer an action to when its clicked 
    useDeleteReviewMutation
} = productApi;