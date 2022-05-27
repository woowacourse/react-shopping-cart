import { setupWorker } from 'msw';
import cartsHandler from './handlers/cartsHandler';
import productsHandler from './handlers/productsHandler';

export const worker = setupWorker(...cartsHandler, ...productsHandler);
