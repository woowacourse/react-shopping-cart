import { cartListHandlers } from './cartListHandlers';
import { productsHandlers } from './productsHandlers';

export const handlers = [...productsHandlers, ...cartListHandlers];
