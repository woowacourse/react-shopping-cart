import { setupWorker } from 'msw';
import { cartHandlers } from '@/mocks/cartHandler';
import { productHandlers } from './productHandlers';

export const worker = setupWorker(...productHandlers, ...cartHandlers);
