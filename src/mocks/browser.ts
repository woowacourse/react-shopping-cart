import { setupWorker } from 'msw';
import { product } from 'mocks/handlers/product';
import { cart } from 'mocks/handlers/cart';

export const worker = setupWorker(...product, ...cart);
