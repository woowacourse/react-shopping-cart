import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import { useHistory } from 'react-router';
import { CartInsertingItemDialog, ProductImage, PRODUCT_IMAGE_TYPE } from '..';
import { PATH } from '../../constants/path';
import useShoppingCart from '../../hooks/useShoppingCart';

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 4px 12px;
`;

const ProductImageWrapper = styled.div`
  cursor: pointer;
`;

const Name = styled.div`
  letter-spacing: 0.5px;
  line-height: 22px;
`;

const Price = styled.div`
  font-size: 20px;
  margin-top: 3px;
  letter-spacing: 0.5px;
  line-height: 27px;
`;

const Image = styled.img`
  cursor: pointer;
`;

const ProductListItem = ({ id, name, src, price }) => {
  const history = useHistory();
  const { insertShoppingCartItem, isDialogOpen, onConfirm, onCancel, dialogType } = useShoppingCart();

  const handleRoutingProductDetail = () => {
    history.push(`${PATH.PRODUCT_LIST}/${id}`, { id });
  };

  return (
    <>
      <ProductImageWrapper onClick={handleRoutingProductDetail}>
        <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={src} alt={name} />
      </ProductImageWrapper>
      <Content>
        <li>
          <Name>{name}</Name>
          <Price>{price.toLocaleString('ko-KR')} 원</Price>
        </li>
        <li>
          <Image onClick={() => insertShoppingCartItem(id)} src={shoppingCartImg} alt="장바구니" />
        </li>
      </Content>

      {isDialogOpen && <CartInsertingItemDialog onConfirm={onConfirm} onCancel={onCancel} type={dialogType} />}
    </>
  );
};

ProductListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductListItem;
