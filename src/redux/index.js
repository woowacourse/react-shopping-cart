import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';
import { orderReducer } from './orderSlice';
import { productReducer } from './productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;

export { getProductsThunk } from './productSlice';
export {
  addProduct,
  deleteProduct,
  deleteCheckedProduct,
  setChecked,
  setCheckedAll,
  clearChecked,
  increaseProduct,
  decreaseProduct,
} from './cartSlice';
export { addOrderedProduct } from './orderSlice';
