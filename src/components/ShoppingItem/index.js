import React from 'react';
import PropTypes from 'prop-types';
import { TrashCan } from '../../assets/svg';
import { FALLBACK } from '../../constants';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import {
  Controller,
  Image,
  Name,
  Product,
  QuantityInput,
} from './index.styles';

const ShoppingItem = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  // onClick = () => {},
}) => (
  <Product>
    <CheckBox checked={true} onClick={() => {}} />
    <Image src={imgUrl} alt={imgAlt} />
    <Name>{name}</Name>
    <Controller>
      <Button onClick={() => {}}>
        <TrashCan />
      </Button>
      <QuantityInput type="number" />
      <span>{price}</span>
    </Controller>
  </Product>
);

ShoppingItem.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  onClick: PropTypes.func,
};

export default ShoppingItem;
