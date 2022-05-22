import { setupWorker } from 'msw';
import { getProductHandler } from './handler';

export const worker = setupWorker(...getProductHandler);
