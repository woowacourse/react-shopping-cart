import { PUT, INITIALIZE } from 'actions/action';

const doPutProductToCart = ({ id, quantity }) => ({ type: PUT, id, quantity });

const doInitializeCart = ({ products }) => ({ type: INITIALIZE, products });

export { doPutProductToCart, doInitializeCart };
