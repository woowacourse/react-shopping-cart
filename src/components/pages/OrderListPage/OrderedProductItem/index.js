import PropTypes from 'prop-types';
import { getFormattedAsKRW } from '../../../../utils';
import * as Styled from './style.js';

export const OrderedProductItem = (props) => {
  const { product, ...rest } = props;
  const { name, price, img, quantity } = product;
  const totalPriceAsKRW = getFormattedAsKRW(price * quantity);

  return (
    <Styled.Container {...rest}>
      <Styled.Image src={img} />
      <Styled.Content>
        <Styled.Name>{name}</Styled.Name>
        <Styled.OrderSummary>
          {totalPriceAsKRW} / 수량 : {quantity}
        </Styled.OrderSummary>
      </Styled.Content>
      <Styled.AddToCartButton>장바구니</Styled.AddToCartButton>
    </Styled.Container>
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
