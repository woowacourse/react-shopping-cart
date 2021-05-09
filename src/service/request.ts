import APIClient from '../API';
import { Product } from '../types';

export const requestProductList = (): Promise<Product[]> => APIClient.get('/productList');
