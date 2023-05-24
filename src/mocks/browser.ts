import { setupWorker } from 'msw';

import { shoppingCartHandler } from './shoppingCartHandler';
import { shoppingItemListHandler } from './shoppingItemListHandler';

export const worker = setupWorker(...shoppingItemListHandler, ...shoppingCartHandler);
