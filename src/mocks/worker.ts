import { setupWorker } from 'msw';
// import { errorHandlers } from './errorHandler';
import { cartHandlers } from '@/mocks/cartHandler';
import { productHandlers } from './productHandlers';

export const worker = setupWorker(...productHandlers, ...cartHandlers);
// export const worker = setupWorker(...errorHandlers);
