import React from 'react';
import styled from 'styled-components';

const StyledHeaderWrapper = styled.header`
	display: flex;
	justify-content: center;

	padding: 1rem;

	width: 100%;
	height: 60px;
	background-color: #333333;
`;

const StyledHeaderBox = styled.div`
	width: 900px;
	height: 100%;

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

const StyledLogo = styled.img``;

function Header() {
	return (
		<StyledHeaderWrapper>
			<StyledHeaderBox>
				<StyledLogo
					src="https://cdn-mart.baemin.com/front-end/assets-static/bmmart_logo_2021@1x.png"
					alt="배민 상회"
				/>
				<StyledCartWrapper>
					<StyledCart>장바구니</StyledCart>
					<StyledCartAmount data-cy="cart-amount">1</StyledCartAmount>
				</StyledCartWrapper>
			</StyledHeaderBox>
		</StyledHeaderWrapper>
	);
}

export default Header;
