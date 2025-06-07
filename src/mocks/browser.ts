import { setupWorker } from 'msw/browser';
import { mockGetCartItems, mockPatchCartItem, mockDeleteCartItem } from './handler';

export const worker = setupWorker(mockGetCartItems, mockPatchCartItem, mockDeleteCartItem);
