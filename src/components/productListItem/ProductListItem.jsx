import React from 'react';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { PATH } from '../../constants/path';
import useProductList from '../../hooks/useProductList';

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

const ProductListItem = ({ product }) => {
  const history = useHistory();

  const { insertProductItem } = useProductList();

  const handleShoppingCart = () => {
    insertProductItem(product);
  };

  const handleProductImageWrapper = () => {
    history.push(`${PATH.PRODUCT_LIST}/${product.product_id}`, {
      product_id: product.product_id,
    });
  };

  return (
    <div>
      <ProductImageWrapper onClick={handleProductImageWrapper}>
        <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={product.image_url} alt={product.name} />
      </ProductImageWrapper>
      <Content>
        <li>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString('ko-KR')} 원</Price>
        </li>
        <li>
          <Image onClick={handleShoppingCart} src={shoppingCartImg} alt="장바구니" />
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
