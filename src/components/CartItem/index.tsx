import React from 'react';
import styled from 'styled-components';
import { Cart } from '@/@types/cart.type';
import MultiSelector from '@/components/common/MultiSelector';
import CheckBox from '@/components/common/CheckBox.tsx';
import Trash from '@/assets/img/Rectangle.svg';
import CartButton from '@/components/common/CartButton';
import { useCart } from '@/components/ProductItem/hooks/useCart';

type CartItemProps = {
	cartItem: Cart;
};

const CartItemOptionBox = styled.div`
	width: 500px;
	height: 200px;

	display: flex;
	justify-content: space-between;

	& + & {
		border-top: 1.5px solid #ccc;
	}
`;

const CartItemImg = styled.img`
	width: 144px;
	height: 144px;
`;

const CheckBoxWrapper = styled.div`
	width: 72px;
	height: 100%;

	& > * {
		margin-top: 24px;
	}
`;

const StyledImgWrapper = styled.div`
	width: max-content;
	height: 100%;

	display: flex;
	align-items: center;
`;

const StyledCartLabel = styled.div`
	margin-top: 24px;
	margin-left: 20px;
	width: max-content;
	height: 100%;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 0.5px;
	color: #333;
`;

const StyledFlex = styled.div`
	display: flex;
`;

const StyledRightContent = styled.div``;

const StyledCartItemPrice = styled.div`
	margin-top: 20px;

	line-height: 24px;
	letter-spacing: 0.5px;
	color: #333333;
`;

const StyledTrashButton = styled.button`
	display: block;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const CartItemOption: React.FC<CartItemProps> = ({ cartItem }) => {
	const { deleteCart } = useCart();

	const handleDeleteCart = () => {
		deleteCart(cartItem.product);
	};

	return (
		<CartItemOptionBox>
			<StyledFlex>
				<CheckBoxWrapper>
					<MultiSelector.CheckBox value={cartItem.product.name} isCustom>
						<CheckBox />
					</MultiSelector.CheckBox>
				</CheckBoxWrapper>
				<StyledImgWrapper>
					<CartItemImg
						src={cartItem.product.imageUrl}
						alt={cartItem.product.name}
					/>
				</StyledImgWrapper>
				<StyledCartLabel>
					<MultiSelector.Label htmlFor={cartItem.product.name}>
						{cartItem.product.name}
					</MultiSelector.Label>
				</StyledCartLabel>
			</StyledFlex>

			<StyledRightContent>
				<StyledTrashButton onClick={handleDeleteCart}>
					<img src={Trash} alt="휴지통 아이콘" />
				</StyledTrashButton>
				<CartButton product={cartItem.product} />
				<StyledCartItemPrice>{cartItem.product.price}원</StyledCartItemPrice>
			</StyledRightContent>
		</CartItemOptionBox>
	);
};

export default CartItemOption;
