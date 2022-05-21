import { CART_ACTIONS, PRODUCT_LIST_ACTIONS, ORDER_ACTIONS } from 'actions/action';

const doPutProductToCart = ({ id, quantity }) => ({ type: CART_ACTIONS.PUT, id, quantity });

const doDeleteProductFromCart = ({ id }) => ({ type: CART_ACTIONS.DELETE, id });

const doInitializeCart = ({ products }) => ({ type: PRODUCT_LIST_ACTIONS.INITIALIZE, products });

const doAddProdcutToOrder = ({ id }) => ({ type: ORDER_ACTIONS.ADD, id });

const doDeleteProductFromOrder = ({ id }) => ({ type: ORDER_ACTIONS.DELETE, id });

const doInitializeOrder = () => ({ type: ORDER_ACTIONS.INITIALIZE });

export {
  doPutProductToCart,
  doDeleteProductFromCart,
  doInitializeCart,
  doAddProdcutToOrder,
  doDeleteProductFromOrder,
  doInitializeOrder,
};
