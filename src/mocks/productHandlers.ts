import { rest } from 'msw';
import { products } from '@/mocks/db';

export const productHandlers = [
	rest.get('/products', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(products));
	}),

	rest.get('/products/:productId', (req, res, ctx) => {
		const { productId } = req.params;
		const product = products.find((pd) => pd.id === productId);

		if (!product) {
			return res(ctx.json(400));
		}

		return res(ctx.status(200), ctx.json(product));
	}),

	rest.post('/products', async (req, res, ctx) => {
		const product = await req.json();
		product.id = String(product.length + 1);
		products.push(product);

		return res(ctx.status(201), ctx.set('Location', `/products/${product.id}`));
	}),

	rest.put('/products/:productId', async (req, res, ctx) => {
		const { productId } = req.params;
		const product = products.find((pd) => pd.id === productId);

		if (!product) {
			return res(ctx.status(400));
		}

		products.push(product);
		return res(ctx.status(200));
	}),

	rest.delete('/products/:productId', async (req, res, ctx) => {
		const { productId } = req.params;
		const productIdx = products.findIndex((pd) => pd.id === productId);

		products.splice(productIdx, 1);

		return res(ctx.status(204));
	}),
];
