import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';
import { productReducer } from './productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
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
} from './cartSlice';
