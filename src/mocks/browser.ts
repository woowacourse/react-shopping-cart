import { cartHanlders } from '@/mocks/handlers/cart';
import { customerHanlders } from '@/mocks/handlers/customer';
import { productHanlders } from '@/mocks/handlers/product';
import { setupWorker } from 'msw';

export const worker = setupWorker(...productHanlders, ...cartHanlders, ...customerHanlders);
