import { setupWorker } from 'msw';
import cartHandler from './handlers/cartHandler';
import productHandler from './handlers/productHandler';

export const worker = setupWorker(...productHandler(), ...cartHandler());
