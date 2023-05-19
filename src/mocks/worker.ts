import { setupWorker } from 'msw';
import { productHandlers } from './productHandlers';
import { cartHandlers } from './cartHandlers';

export const worker = setupWorker(...productHandlers, ...cartHandlers);
