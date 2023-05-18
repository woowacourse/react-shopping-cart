import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { cartState } from '@/atoms/cart';
import { sum } from '@/utils/utils';

const StyledHeaderWrapper = styled.header`
	display: flex;
	justify-content: center;

	width: 100%;
	height: 84px;
	background-color: #333333;
`;

const StyledHeaderBox = styled.div`
	width: 900px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	color: white;
`;

const StyledTitle = styled.div`
	font-size: 40px;
	font-weight: 900;
	line-height: 57.92px;
`;

const StyledCartWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`;

const StyledCart = styled.div`
	font-size: 24px;
	font-weight: 500;
	line-height: 12.3px;
`;

const StyledCartAmount = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 26px;
	height: 26px;
	border-radius: 50%;

	background-color: #04c09e;
`;

const Header: React.FC = () => {
	const cart = useRecoilValue(cartState);
	const totalAmount = sum([...cart.map((item) => item.quantity)]);

	return (
		<StyledHeaderWrapper>
			<StyledHeaderBox>
				<StyledTitle>SHOP</StyledTitle>
				<StyledCartWrapper>
					<StyledCart>장바구니</StyledCart>
					<StyledCartAmount data-cy="cart-amount">
						{totalAmount}
					</StyledCartAmount>
				</StyledCartWrapper>
			</StyledHeaderBox>
		</StyledHeaderWrapper>
	);
};

export default Header;
