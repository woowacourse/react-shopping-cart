import { cartHandlers } from './cart';
import { productHandlers } from './product';

const handlers = [...productHandlers, ...cartHandlers];

export { handlers };
