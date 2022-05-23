import cartHandlers from './cart';
import productsHandlers from './products';

const handlers = [...productsHandlers, ...cartHandlers];

export default handlers;
