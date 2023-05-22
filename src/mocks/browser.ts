import { setupWorker } from 'msw';
import { productHandler, cartHandler } from './handlers';

export const worker = setupWorker(...productHandler, ...cartHandler);
