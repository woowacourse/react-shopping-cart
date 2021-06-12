import { FetchError } from './../../../utils/error';
import { CartItem } from '../../../types';

export const name = 'cart';

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: FetchError | Error | null;
}
