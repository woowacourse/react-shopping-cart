import React from 'react';
import styled from 'styled-components';

const PaymentBoxContainer = styled.div`
	margin-top: 90px;

	width: 448px;
	height: 348px;

	border: 1px solid #ddd;
`;

const StyledPaymentTitle = styled.h3`
	font-size: 24px;
	line-height: 33px;
	letter-spacing: 0.5px;
	color: #333333;

	padding: 20px;
	border-bottom: 3px solid #ddd;
`;

const StyledSpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledPaymentContent = styled.div`
	font-weight: 700;
	font-size: 20px;
	line-height: 27px;
	letter-spacing: 0.5px;
	color: #333333;

	padding: 38px 30px 34px 30px;

	${StyledSpaceBetween} + ${StyledSpaceBetween} {
		margin-top: 18px;
	}

	${StyledSpaceBetween} + button {
		margin-top: 32px;
	}
`;

const StyledOrderButton = styled.button`
	width: 100%;
	height: 52px;
	background: #333;
	color: #fff;
`;

type PaymentBoxProps = {
	totalAmount: string;
};

const PaymentBox: React.FC<PaymentBoxProps> = ({ totalAmount }) => {
	return (
		<PaymentBoxContainer>
			<StyledPaymentTitle>결제예상금액</StyledPaymentTitle>
			<StyledPaymentContent>
				<StyledSpaceBetween>
					<p>총 상품가격</p>
					<p>{totalAmount}원</p>
				</StyledSpaceBetween>
				<StyledSpaceBetween>
					<span>총 배송비</span>
					<span>0원</span>
				</StyledSpaceBetween>
				<StyledSpaceBetween>
					<span>총 주문금액</span>
					<span>{totalAmount}원</span>
				</StyledSpaceBetween>
				<StyledOrderButton disabled>주문하기</StyledOrderButton>
			</StyledPaymentContent>
		</PaymentBoxContainer>
	);
};

export default PaymentBox;
