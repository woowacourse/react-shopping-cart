import { cartHandlers } from './cart';
import { productsHandlers } from './products';

export const handlers = [...productsHandlers, ...cartHandlers];
