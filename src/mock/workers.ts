import { setupWorker } from 'msw';
import { handlers } from './hanlders/index';

export const worker = setupWorker(...handlers);
