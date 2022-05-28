import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store';

export interface ProductData {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

export interface CartProductData extends ProductData {
  quantity: number;
}

export type AppDispatch<T extends Action> = ThunkDispatch<RootState, null, T>;
