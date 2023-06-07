import { rest } from 'msw';
import { carts } from '@/mocks/db';

export const cartHandlers = [
	rest.get('/cart-items', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(carts));
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
