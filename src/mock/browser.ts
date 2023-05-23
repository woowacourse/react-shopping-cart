import { setupWorker } from 'msw';
import { handlers } from './handlers/index';

export const worker = setupWorker(...handlers);
