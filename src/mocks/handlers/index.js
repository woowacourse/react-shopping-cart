import productsHandlers from './products';
import cartHandlers from './cart';

export const handlers = [...productsHandlers, ...cartHandlers];
