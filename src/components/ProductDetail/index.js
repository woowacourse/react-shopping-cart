import React from 'react';
import PropTypes from 'prop-types';
import Button from '../@common/Button';
import Image from '../@common/Image';
import useProducts from '../../hooks/useProducts';
import useLoading from '../../hooks/useLoading';
import { formatPrice } from '../../utils';
import { PALETTE } from '../../constants';
import { Detail, Name, PriceWrapper, Product } from './index.styles';

const ProductDetail = ({ product }) => {
  const { show } = useLoading();
  const { addToCart } = useProducts();
  const { name, price, image_url } = product;

  return (
    <Product>
      <Detail>
        <Image src={image_url} alt={name} />
        <Name>{name}</Name>
        <PriceWrapper>
          <span>금액</span>
          <span>{formatPrice(price)}원</span>
        </PriceWrapper>
      </Detail>
      <Button
        backgroundColor={PALETTE.BROWN}
        onClick={() => addToCart(product, show)}
      >
        장바구니
      </Button>
    </Product>
  );
};

ProductDetail.propTypes = {
  image_url: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  onClick: PropTypes.func,
};

export default ProductDetail;
