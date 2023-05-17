import { setupWorker } from 'msw';
import { handlers as cartItemsHandlers } from './handlers/cart-items';
import { handlers as productsHandlers } from './handlers/products';

const handlers = [...productsHandlers, ...cartItemsHandlers];

const worker = setupWorker(...handlers);

worker.start();
