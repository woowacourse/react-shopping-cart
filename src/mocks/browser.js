import { setupWorker } from 'msw';
import { productHandlers, cartHandlers } from './handler';

export const worker = setupWorker(...productHandlers, ...cartHandlers);
