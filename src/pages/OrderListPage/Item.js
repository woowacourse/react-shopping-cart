import PropTypes from 'prop-types';

import { getFormattedAsKRW } from '../../utils';
import * as S from './style.js';

export const Item = (props) => {
  const { product, addProduct, ...rest } = props;
  const { name, price, imageUrl, quantity } = product;
  const totalPriceAsKRW = getFormattedAsKRW(price * quantity);

  return (
    <S.Container {...rest}>
      <S.Image src={imageUrl} />
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.OrderSummary>
          {totalPriceAsKRW} / 수량 : {quantity}
        </S.OrderSummary>
      </S.Content>
      <S.AddToCartButton onClick={addProduct}>장바구니</S.AddToCartButton>
    </S.Container>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
