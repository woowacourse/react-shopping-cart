import { handlers } from './handlers';
import { setupWorker } from 'msw';

const worker = setupWorker(...handlers);

export { worker };
