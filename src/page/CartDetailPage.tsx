import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import MultiSelector from '@/components/common/MultiSelector';
import Header from '@/components/Header';
import { cartState } from '@/atoms/cart';
import CartItemOption from '@/components/CartItem';
import CheckBox from '@/components/common/CheckBox.tsx';
import { sum } from '@/utils/utils';
import PaymentBox from '@/components/PaymentBox';
import { useCart } from '@/components/ProductItem/hooks/useCart';

const CartItemOptionWrapper = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CartDetailTitle = styled.h2`
	margin-top: 58px;

	line-height: 32px;
	font-weight: 700;
	font-size: 32px;
`;

const CartDetailSection = styled.section`
	margin-top: 20px;

	width: 900px;
`;

const CartDetailLine = styled.div`
	margin-top: 32px;

	width: 900px;
	height: 4px;
	background: #333;
`;

const CartDetailBoxLine = styled.div`
	margin-top: 16px;

	width: 500px;
	height: 4px;
	background: #aaa;
`;

const CartDetailCount = styled.div`
	margin-top: 32px;

	font-size: 20px;
	line-height: 34px;
	letter-spacing: 0.5px;

	color: #333333;
`;

const StyledVCenter = styled.div`
	display: flex;
	align-items: center;
`;

const CheckBoxWrapper = styled.div`
	width: 72px;
	height: 100%;
`;

const StyledFlex = styled.div`
	width: 900px;
	display: flex;
`;

const CartDetailPage: React.FC = () => {
	const { deleteCart } = useCart();
	const cartItems = useRecoilValue(cartState);
	const [selections, setSelections] = useState<Record<string, boolean>>({});

	useEffect(() => {
		const newSelections = cartItems.reduce((acc, cartItem) => {
			return { ...acc, [cartItem.product.name]: false };
		}, {});

		setSelections(newSelections);
	}, [cartItems]);

	const totalAmount = sum(
		cartItems.map((cartItem) => {
			if (selections[cartItem.product.name]) {
				return cartItem.quantity * cartItem.product.price;
			}

			return 0;
		})
	);

	const handleDeleteSelection = () => {
		cartItems.forEach((cartItem) => {
			if (selections[cartItem.product.name]) {
				deleteCart(cartItem.product);
			}
		});
	};

	return (
		<>
			<Header />
			<CartItemOptionWrapper>
				<CartDetailTitle>장바구니</CartDetailTitle>
				<CartDetailLine />
				<StyledFlex>
					<CartDetailSection>
						<MultiSelector options={selections} checkOptions={setSelections}>
							<CartDetailCount>
								든든 배송 상품 ({cartItems.length})개
							</CartDetailCount>
							<CartDetailBoxLine />
							{cartItems.map((cartItem) => {
								return <CartItemOption key={cartItem.id} cartItem={cartItem} />;
							})}
							<StyledVCenter>
								<CheckBoxWrapper>
									<MultiSelector.CheckBoxForAll value="all" isCustom>
										<CheckBox />
									</MultiSelector.CheckBoxForAll>
								</CheckBoxWrapper>
								<MultiSelector.Label htmlFor="all">
									<span>
										전체 선택{' '}
										{sum(
											Object.values(selections).map((value) => (value ? 1 : 0))
										)}{' '}
										/ {cartItems.length}
									</span>
								</MultiSelector.Label>
								<button type="button" onClick={handleDeleteSelection}>
									선택 삭제
								</button>
							</StyledVCenter>
						</MultiSelector>
					</CartDetailSection>

					<PaymentBox totalAmount={totalAmount.toLocaleString()} />
				</StyledFlex>
			</CartItemOptionWrapper>
		</>
	);
};

export default CartDetailPage;
