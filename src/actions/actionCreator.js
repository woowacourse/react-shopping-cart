import { CART_INITIALIZE, CART_PUT, PRODUCT_INITIALIZE } from 'actions/action';

const putProductToCart = ({ id, quantity }) => ({ type: CART_PUT, id, quantity });

const initProduct = ({ products }) => ({ type: PRODUCT_INITIALIZE, products });

const initShoppingCart = ({ shoppingCart }) => ({ type: CART_INITIALIZE, shoppingCart });

export { putProductToCart, initProduct, initShoppingCart };
