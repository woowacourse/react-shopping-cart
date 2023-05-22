import { Product } from '@/@types/product.type';

export type Cart = {
	id: number;
	quantity: number;
	product: Product;
};
