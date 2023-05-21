import type { CartProduct } from '../../types/product';

export interface CheckedState {
  id: number;
  isChecked: boolean;
}

export interface CartProductWithChecked extends CartProduct {
  isChecked: boolean;
}
