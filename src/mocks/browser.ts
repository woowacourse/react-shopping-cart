import { setupWorker } from 'msw/browser';
import { handlers } from './handler';

export const worker = setupWorker(...handlers);
worker.start({
  serviceWorker: {
    url: '/react-shopping-products/mockServiceWorker.js'
  }
});
