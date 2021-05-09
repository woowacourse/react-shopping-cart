import { ItemInCart, Product } from '../../types';
import { ADD_ITEM, CartAction } from '../actions/cart';

interface CartState {
  items: ItemInCart[];
}

const initialState = {
  items: [],
};

const createItemInCart = (product: Product): ItemInCart => {
  return {
    ...product,
    checked: true,
    quantity: 1,
  };
};

const cartReducer = (state: CartState = initialState, action: CartAction) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, createItemInCart(action.payload)],
      };
    default:
      return state;
  }
};

export default cartReducer;
