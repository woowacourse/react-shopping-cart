import { setupWorker } from 'msw';
import productHandler from './handlers/productHandler';

export const worker = setupWorker(...productHandler());
