import { rest } from 'msw';
import { getLocalData, setLocalData } from '@/utils/localStorage';
import { carts } from '@/mocks/db';

export const cartHandlers = [
	rest.get('/cart-items', (req, res, ctx) => {
		let serverCartData = getLocalData('CART');

		if (serverCartData.length === 0) {
			setLocalData('CART', carts);
			serverCartData = getLocalData('CART');
		}

		return res(ctx.status(200), ctx.json(serverCartData));
	}),

	rest.post('/cart-items', (req, res, ctx) => {
		return res(ctx.status(201));
	}),

	rest.patch('/cart-items/:cartItemId', (req, res, ctx) => {
		return res(ctx.status(200));
	}),

	rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
		return res(ctx.status(204));
	}),
];
