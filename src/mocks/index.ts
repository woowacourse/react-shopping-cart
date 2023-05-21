import { setupWorker } from 'msw';
import { joinPath } from '../api/utils/http';
import handlers from './handlers';

const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: joinPath(import.meta.env.BASE_URL, 'mockServiceWorker.js'),
  },
});
