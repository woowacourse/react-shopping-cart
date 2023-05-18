import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ProductItem from '@/components/ProductItem';
import { fetchProductSelector } from '@/atoms/product';

const StyledProductListWrapper = styled.div`
	padding: 100px;
	display: grid;
	justify-content: space-between;
	grid-template-columns: repeat(auto-fill, minmax(282px, auto));
	grid-column-gap: 47px;
	grid-row-gap: 85px;
`;

const ProductList: React.FC = () => {
	const products = useRecoilValue(fetchProductSelector);

	return (
		<StyledProductListWrapper>
			{products.map((product) => {
				return <ProductItem key={product.id} product={product} />;
			})}
		</StyledProductListWrapper>
	);
};

export default ProductList;
