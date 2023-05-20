import { CartProduct, Product } from 'types/product';

export type Fetcher = (url: string, options?: RequestInit) => Promise<unknown>;

export type GetProductsResponse = Product[];

export type GetCartProductsResponse = CartProduct[];

export type CreateCartProductResponse = void;

export type UpdateCartProductResponse = void;

export type DeleteCartProductResponse = void;
