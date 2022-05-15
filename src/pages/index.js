import { lazy } from 'react';

export const ProductList = lazy(() => import('pages/ProductList'));
export const Product = lazy(() => import('pages/Product'));
export const Cart = lazy(() => import('pages/Cart'));
export const NotFound = lazy(() => import('pages/NotFound'));
