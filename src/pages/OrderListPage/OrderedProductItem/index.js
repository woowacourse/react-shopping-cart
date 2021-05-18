import PropTypes from 'prop-types';
import { getFormattedAsKRW } from '../../../utils';
import * as S from './style.js';

export const OrderedProductItem = (props) => {
  const { product, addProduct, ...rest } = props;
  const { name, price, img, quantity } = product;
  const totalPriceAsKRW = getFormattedAsKRW(price * quantity);

  return (
    <S.Container {...rest}>
      <S.Image src={img} />
      <S.Content>
        <S.Name>{name}</S.Name>
        <S.OrderSummary>
          {totalPriceAsKRW} / 수량 : {quantity}
        </S.OrderSummary>
      </S.Content>
      <S.AddToCartButton onClick={() => addProduct(product)}>장바구니</S.AddToCartButton>
    </S.Container>
  );
};

OrderedProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
