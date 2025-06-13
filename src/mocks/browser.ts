import { setupWorker } from 'msw/browser';
import { mockGetCartItems, mockPatchCartItem, mockDeleteCartItem, mockGetCoupons } from './handler';

export const worker = setupWorker(mockGetCartItems, mockPatchCartItem, mockDeleteCartItem, mockGetCoupons);
