import APIClient from '../API';
import { Product } from '../types';

const requestProductList = () => APIClient.getAll<Product>('productionList');
