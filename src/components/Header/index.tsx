import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { cartState } from '@/atoms/cart';

const StyledHeaderWrapper = styled.header`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 84px;
	background-color: #333333;
`;

const StyledHeaderBox = styled.div`
	min-width: 900px;
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
	const cartItems = useRecoilValue(cartState);

	return (
		<StyledHeaderWrapper>
			<StyledHeaderBox>
				<StyledTitle>SHOP</StyledTitle>
				<StyledCartWrapper>
					<StyledCart>
						<Link to="cart-detail">장바구니</Link>
					</StyledCart>
					<StyledCartAmount data-cy="cart-amount">
						{cartItems?.length}
					</StyledCartAmount>
				</StyledCartWrapper>
			</StyledHeaderBox>
		</StyledHeaderWrapper>
	);
};

export default Header;
