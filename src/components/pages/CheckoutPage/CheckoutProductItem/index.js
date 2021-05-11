import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const CheckoutProductItem = (props) => {
  const { product, ...rest } = props;
  const { name, img, quantity } = product;

  return (
    <Styled.Container {...rest}>
      <Styled.Image src={img} />
      <Styled.Content>
        <Styled.Name>{name}</Styled.Name>
        <Styled.Quantity>수량 : {quantity}</Styled.Quantity>
      </Styled.Content>
    </Styled.Container>
  );
};

CheckoutProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
