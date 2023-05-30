import { setupWorker } from 'msw';
import { productHandlers } from './handlers/productHandlers';
import { cartHandlers } from './handlers/cartHandlers';

export const worker = setupWorker(...productHandlers, ...cartHandlers);
