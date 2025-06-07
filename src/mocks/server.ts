import { setupServer } from 'msw/node';
import { mockGetCartItems, mockPatchCartItem, mockDeleteCartItem } from './handler';

export const server = setupServer(mockGetCartItems, mockPatchCartItem, mockDeleteCartItem);
