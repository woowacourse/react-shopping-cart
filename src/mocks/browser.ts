import { setupWorker } from 'msw';
import { productHandlers } from './handlers/productHandlers';

export const worker = setupWorker(...productHandlers);
