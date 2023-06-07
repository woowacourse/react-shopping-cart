import { rest } from 'msw';

export const errorHandlers = [
	rest.get('/products', (req, res, ctx) => {
		return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
	}),

	// rest.get('products', (req, res, ctx) => {
	// 	return res(ctx.status(401));
	// }),

	// rest.get('products', (req, res, ctx) => {
	// 	return res(ctx.status(403));
	// }),

	// rest.get('products', (req, res, ctx) => {
	// 	return res(ctx.status(404));
	// }),

	// rest.get('products', (req, res, ctx) => {
	// 	return res(ctx.status(405));
	// }),

	// rest.get('products', (req, res, ctx) => {
	// 	return res(ctx.status(500));
	// }),

	// rest.get('products', (req, res, ctx) => {
	// 	return res(ctx.status(501));
	// }),
];
