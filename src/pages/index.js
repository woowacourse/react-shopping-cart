import { lazy } from 'react';

export const ProductList = lazy(() => import('pages/ProductList/ProductList'));
export const Product = lazy(() => import('pages/Product/Product'));
export const Cart = lazy(() => import('pages/Cart/Cart'));
export const NotFound = lazy(() => import('pages/NotFound/NotFound'));
