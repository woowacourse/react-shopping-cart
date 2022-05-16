import { CART, PRODUCT_LIST } from 'actions/action';

const doPutProductToCart = ({ id, quantity }) => ({ type: CART.PUT, id, quantity });

const doInitializeCart = ({ products }) => ({ type: PRODUCT_LIST.INITIALIZE, products });

export { doPutProductToCart, doInitializeCart };
