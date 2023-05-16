import { setupWorker } from 'msw';

import { shoppingItemListHandler } from './shoppingItemListHandler';

// Configure the Service Worker for in-browser request interception
export const worker = setupWorker(...shoppingItemListHandler);
