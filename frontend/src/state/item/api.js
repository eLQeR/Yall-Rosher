import { createApi } from '@reduxjs/toolkit/query/react';
import { defaultItemImage } from '../../consts/images';
import { baseQueryWithReauth } from '../api';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: (category) => ({
        url: `/yall-rosher/items/?category=${category}`,
      }),
      providesTags: ['Items'],
    }),
    getItemDetails: builder.query({
      query: (id) => ({
        url: `/yall-rosher/items/${id}/`,
      }),
      transformResponse: (data) => {
        if (!data.colors || data.colors.length === 0)
          data.colors = [
            { color: 'Не знайдено', hex: '#FFFFFF', id: undefined },
          ];
        if (!data.images || data.images.length === 0)
          data.images = [{ image: defaultItemImage }];
        return data;
      },
      providesTags: ['Item'],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/yall-rosher/semi-categories/`,
      }),
      transformResponse: (data) => {
        const mapping = {};
        data.forEach((category) => {
          if (!mapping[category.type]) mapping[category.type] = {};
          if (!mapping[category.type][category.category])
            mapping[category.type][category.category] = [];
          mapping[category.type][category.category].push({
            id: category.id,
            name: category.name,
          });
        });
        console.log(mapping);
        return mapping;
      },
      providesTags: ['Categories'],
    }),
    makeOrder: builder.mutation({
      query: (data) => ({
        url: '/yall-rosher/orders/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Item'],
    }),

    getOrders: builder.query({
      query: (pageId) => ({
        url: `/yall-rosher/orders/?page=${pageId}`,
      }),
      providesTags: ['Orders'],
    }),

    getCancelOrder: builder.mutation({
      query: (canceledOrderId) => ({
        url: `/yall-rosher/orders/${canceledOrderId}/cancel-order/`,
        method: 'POST',
      }),
      providesTags: ['Orders'],
    }),

    getSearchData: builder.query({
      query: (url) => ({
        // ?name=&page=2",
        url,
      }),
      providesTags: ['Search'],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetItemDetailsQuery,
  useGetCategoriesQuery,
  useMakeOrderMutation,
  useGetOrdersQuery,
  useGetCancelOrderMutation,
  useGetSearchDataQuery,
} = itemApi;
