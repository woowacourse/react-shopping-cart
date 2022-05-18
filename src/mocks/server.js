import { setupWorker } from 'msw';
import { cartHandler } from './cart';
import { productHandler } from './product';

export const worker = setupWorker(...productHandler, ...cartHandler);
