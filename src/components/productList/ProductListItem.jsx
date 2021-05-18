import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import { useHistory } from 'react-router';
import { ProductImage, PRODUCT_IMAGE_TYPE } from '..';
import { PATH } from '../../constants/path';
import useInsertingItemToShoppingCart from '../../hooks/useInsertingItemToShoppingCart';

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
  const { insertShoppingCart, isDialogOpen, Dialog } = useInsertingItemToShoppingCart({
    product_id: id,
  });

  const handleRoutingProductDetail = () => {
    history.push(`${PATH.PRODUCT_LIST}/${id}`, { id });
  };

  return (
    <>
      <div>
        <ProductImageWrapper onClick={handleRoutingProductDetail}>
          <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={src} alt={name} />
        </ProductImageWrapper>
        <Content>
          <li>
            <Name>{name}</Name>
            <Price>{price.toLocaleString('ko-KR')} 원</Price>
          </li>
          <li>
            <Image onClick={insertShoppingCart} src={shoppingCartImg} alt="장바구니" />
          </li>
        </Content>
      </div>

      {isDialogOpen && <Dialog />}
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
