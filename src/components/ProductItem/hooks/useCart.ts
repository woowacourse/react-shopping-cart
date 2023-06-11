import { useRecoilState } from 'recoil';
import { fetcher } from '@/utils/fetcher';
import { deleteItemIndexAt, replaceItemIndexAt } from '@/utils/array';
import { cartState } from '@/atoms/cart';
import { Product } from '@/@types/product.type';

export const useCart = () => {
	const [cart, setCart] = useRecoilState(cartState);

	const addCart = (product: Product) => {
		fetcher('/cart-Items', {
			method: 'POST',
			body: JSON.stringify({ productsId: product.id }),
		});

		setCart((prev) => [...prev, { id: cart.length + 1, quantity: 1, product }]);
	};

	const updateCart = (quantity: number, product: Product) => {
		const index = cart.findIndex((item) => item.product.id === product.id);
		const cartItemId = cart.find((item) => item.product.id === product.id).id;

		const newCart = replaceItemIndexAt(cart, index, {
			...cart[index],
			quantity,
		});

		fetcher(`/cart-items/${cartItemId}`, {
			method: 'PATCH',
			body: JSON.stringify({ quantity }),
			headers: {
				'Content-type': 'application/json',
			},
		});

		setCart(newCart);
	};

	const deleteCart = (product: Product) => {
		const cartItemId = cart.find((item) => item.product.id === product.id).id;

		fetcher(`/cart-items/${cartItemId}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			},
		});

		setCart((prevCart) =>
			deleteItemIndexAt(
				prevCart,
				prevCart.findIndex((item) => item.product.id === product.id)
			)
		);
	};

	return { cart, addCart, updateCart, deleteCart };
};
