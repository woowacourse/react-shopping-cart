import { cartHanlders } from '@/mocks/handlers/cart';
import { productHanlders } from '@/mocks/handlers/product';
import { setupWorker } from 'msw';

export const worker = setupWorker(...productHanlders, ...cartHanlders);
