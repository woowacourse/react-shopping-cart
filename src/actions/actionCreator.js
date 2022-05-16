import { PUT, INITIALIZE } from 'actions/action';

const putProductToCart = ({ id, quantity }) => ({ type: PUT, id, quantity });

const initializeCart = ({ products }) => ({ type: INITIALIZE, products });

export { putProductToCart, initializeCart };
