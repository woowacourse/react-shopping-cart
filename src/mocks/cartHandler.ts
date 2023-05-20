import { rest } from 'msw';
import { carts, products } from '@/mocks/db';

export const cartHandlers = [
	rest.get('/cart-items', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(carts));
	}),

	rest.post('/cart-items', async (req, res, ctx) => {
		const { productsId } = await req.json();

		const product = products.find((pd) => pd.id === productsId);
		const cartItemId = String(carts.length + 1);

		carts.push({
			id: cartItemId,
			quantity: 1,
			product,
		});

		return res(
			ctx.status(201),
			ctx.set('Location', `/cart-items/${cartItemId}`)
		);
	}),

	rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
		const { quantity } = await req.json();
		const { cartItemId } = req.params;

		const cartItem = carts.find((cart) => cart.id === cartItemId);
		cartItem.quantity = quantity;

		return res(ctx.status(200));
	}),

	rest.delete('/cart-items/:cartItemId', async (req, res, ctx) => {
		const { cartItemId } = req.params;
		const cartItemIdx = carts.findIndex((cart) => cart.id === cartItemId);

		carts.splice(cartItemIdx, 1);

		return res(ctx.status(204));
	}),
];
