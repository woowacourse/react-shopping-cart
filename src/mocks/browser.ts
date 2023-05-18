import { setupWorker } from 'msw';
import { product } from 'mocks/handlers/product';

export const worker = setupWorker(...product);
