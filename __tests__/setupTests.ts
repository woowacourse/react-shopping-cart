import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handler';
import '@testing-library/jest-dom';

export const server = setupServer(...handlers);
