import { hanlders } from '@/mocks/handlers';
import { setupWorker } from 'msw';

export const worker = setupWorker(...hanlders);
