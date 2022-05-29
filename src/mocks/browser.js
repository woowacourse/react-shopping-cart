import { setupWorker } from 'msw';
import cartsHandler from './handlers/cartsHandler';
import productsHandler from './handlers/productsHandler';
import userHandler from './handlers/userHandler';

export const worker = setupWorker(
  ...cartsHandler,
  ...productsHandler,
  ...userHandler
);
