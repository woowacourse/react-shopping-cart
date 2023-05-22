import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '@/components/ProductItem/hooks/useCart';
import Cart from '@/assets/img/cart.svg';
import { Product } from '@/@types/product.type';

type ProductItemProps = {
	product: Product;
};

const StyledCountInput = styled.input`
	width: 50px;
	text-align: center;
`;

const CartButton: React.FC<ProductItemProps> = ({ product }) => {
	const { cart, addCart, updateCart, deleteCart } = useCart();

	const productItemQuantity = cart.find(
		(c) => c.product.id === product.id
	)?.quantity;

	const [count, setCount] = useState(productItemQuantity || 0);

	const handleCartAmount = () => {
		addCart(product);
		setCount(1);
	};

	const limitInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 3) {
			e.target.value = e.target.value.slice(0, 3);
		}
	};

	const handleCartAmountChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		limitInputNumber(e);
		const newCount = Number(e.target.value);

		if (newCount === 0) {
			deleteCart(product);
		} else {
			updateCart(newCount, product);
		}

		setCount(newCount);
	};

	const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
		if (Number(e.target.value) < 1) {
			setCount(0);
			deleteCart(product);
		}
	};

	return (
		<>
			{count === 0 ? (
				<button onClick={handleCartAmount}>
					<img src={Cart} alt="장바구니 아이콘" />
				</button>
			) : (
				<StyledCountInput
					type="number"
					value={count}
					min={0}
					max={100}
					onChange={handleCartAmountChange}
					onBlur={handleBlur}
				/>
			)}
		</>
	);
};

export default CartButton;
