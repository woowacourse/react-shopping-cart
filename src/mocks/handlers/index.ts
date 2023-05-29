import { handlers as cartItemsHandlers } from './cart-items';
import { handlers as productsHandlers } from './products';

const handlers = [...productsHandlers, ...cartItemsHandlers];

export default handlers;
