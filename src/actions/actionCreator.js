import { CART_ACTIONS, PRODUCT_LIST_ACTIONS } from 'actions/action';

const doPutProductToCart = ({ id, quantity }) => ({ type: CART_ACTIONS.PUT, id, quantity });

const doInitializeCart = ({ products }) => ({ type: PRODUCT_LIST_ACTIONS.INITIALIZE, products });

export { doPutProductToCart, doInitializeCart };
