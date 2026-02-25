import type { Product } from "../../../entities/product/model/types.ts";

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type GetProductsArgs = {
  limit: number | undefined;
  skip: number | undefined;
};
