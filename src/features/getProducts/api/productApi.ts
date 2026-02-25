import { baseApi } from "../../../shared/api/baseApi.ts";
import type { GetProductsArgs, ProductsResponse } from "./types.ts";
import type { Product } from "../../../entities/product/model/types.ts";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsArgs>({
      query: ({ limit, skip }) => ({
        url: `products?limit=${limit}&skip=${skip}&select=title,price,description,discountPercentage`,
        method: "GET",
      }),
      // Кэширование: данные кэшируются на 60 секунд
      keepUnusedDataFor: 60,
      // Теги для автоматической инвалидации
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProduct: builder.query<Product, number>({
      query: (id: number) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      // Кэширование одного продукта на 5 минут
      keepUnusedDataFor: 300,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: (query: string) => ({
        url: `products/search?q=${query}`,
        method: "GET",
      }),
      // Поисковые запросы кэшируются на 30 секунд
      keepUnusedDataFor: 30,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
} = productApi;
