import { setupWorker } from 'msw';
import { productHandler } from './product';

export const worker = setupWorker(...productHandler);
