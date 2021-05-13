import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import GridColumnList from '../components/utils/GridColumnList';
import Image from '../components/utils/Image';
import IconButton from '../components/utils/IconButton';
import PriceText from '../components/utils/PriceText';

import cartImage from '../asset/cart.png';
import { getProducts } from '../api/products';

import { addItemToCart } from '../modules/cart';

import styled from 'styled-components';

const StyledProduct = styled.li`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 360px;
  cursor: pointer;

  &:hover .product-image {
    transition: all 0.3s ease-out 0s;
    transform: scale(1.1);
  }
`;

const StyledProductDescDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 282px;
  padding: 18px 12px 0;
`;

const StyledProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 215px;
`;

const StyledProductName = styled.span`
  font-size: 16px;
  width: 100%;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const setProductsByFetch = async () => {
      setProducts(await getProducts());
    };

    setProductsByFetch();
  }, []);

  const onAddCartButtonClick = (item) => {
    dispatch(addItemToCart(item));
  };

  const getProductItem = () => {
    return products.map((product) => (
      <StyledProduct key={product.id}>
        <Image src={product.image} alt={product.name} className="product-image" isBackgroundImageNeeded={true} />

        <StyledProductDescDiv>
          <StyledProductInfoDiv>
            <StyledProductName>{product.name}</StyledProductName>
            <PriceText fontSize="20px" lineHeight="26.7px">
              {product.price}
            </PriceText>
          </StyledProductInfoDiv>

          <IconButton src={cartImage} alt="장바구니 아이콘" onClick={() => onAddCartButtonClick(product)} />
        </StyledProductDescDiv>
      </StyledProduct>
    ));
  };

  return (
    <>
      <GridColumnList gridColumnGap="48px" gridRowGap="28px" gridColumnRepeatCount="4" gridColumnWidth="282px">
        {getProductItem()}
      </GridColumnList>
    </>
  );
};

export default ProductListPage;
