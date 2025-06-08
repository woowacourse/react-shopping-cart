import { setupServer } from 'msw/node';
import { mockGetCartItems, mockPatchCartItem, mockDeleteCartItem, mockGetCoupons } from './handler';

export const server = setupServer(mockGetCartItems, mockPatchCartItem, mockDeleteCartItem, mockGetCoupons);
