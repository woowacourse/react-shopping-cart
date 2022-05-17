import { CART_DELETE, CART_INITIALIZE, CART_PUT, PRODUCT_INITIALIZE } from 'actions/action';

const putProductToCart = ({ id, quantity, isSelect }) => ({
  type: CART_PUT,
  id,
  quantity,
  isSelect,
});

const deleteProductAtCart = ({ id }) => ({
  type: CART_DELETE,
  id,
});

const initProduct = ({ products }) => ({ type: PRODUCT_INITIALIZE, products });

const initShoppingCart = ({ shoppingCart }) => ({ type: CART_INITIALIZE, shoppingCart });

export { putProductToCart, deleteProductAtCart, initProduct, initShoppingCart };
