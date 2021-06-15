import React from 'react';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { insertShoppingCartItem } from '../../redux/shoppingCart';
import PropTypes from 'prop-types';

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 4px 12px;
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

const ProductListItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleShoppingCartImage = () => {
    const shoppingCartItem = { ...product, isChecked: true, quantity: 1 };
    console.log(shoppingCartItem);

    dispatch(insertShoppingCartItem(shoppingCartItem));
  };

  return (
    <div>
      <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={product.image_url} alt={product.name} />
      <Content>
        <li>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString('ko-KR')} 원</Price>
        </li>
        <li>
          <Image onClick={handleShoppingCartImage} src={shoppingCartImg} alt="장바구니" />
        </li>
      </Content>
    </div>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_url: PropTypes.string,
  }).isRequired,
};

export default ProductListItem;
