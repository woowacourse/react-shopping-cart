import React from 'react';
import styled from 'styled-components';

import { Product } from '@/@types/product.type';
import CartButton from '@/components/common/CartButton';

type ProductItemProps = {
	product: Product;
};

const StyledProductItemWrapper = styled.li`
	width: 282px;
	height: 360px;
`;

const StyledThumbnail = styled.img`
	width: 282px;
	height: 282px;
`;

const StyledInfoWrapper = styled.div`
	margin-top: 18px;
	padding: 0 12px;

	display: flex;
	justify-content: space-between;
	line-height: 22px;
	color: #333333;
	letter-spacing: 0.5px;
`;

const StyledProductTitle = styled.div``;

const StyledProductPrice = styled.div`
	font-size: 20px;
	line-height: 27px;
`;

const StyledAddToCart = styled.div``;

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
	const { name, price, imageUrl } = product;

	return (
		<StyledProductItemWrapper data-cy="product-item">
			<StyledThumbnail src={imageUrl} alt="납작" />
			<StyledInfoWrapper>
				<div>
					<StyledProductTitle>{name}</StyledProductTitle>
					<StyledProductPrice>{price}원</StyledProductPrice>
				</div>
				<StyledAddToCart data-cy="add-cart">
					<CartButton product={product} />
				</StyledAddToCart>
			</StyledInfoWrapper>
		</StyledProductItemWrapper>
	);
};

export default ProductItem;
