import PropTypes from 'prop-types';
import * as Styled from './style.js';

/*
  item 데이터 형식
  {
    "quantity": 2,
    "product": {
      "id": "1",
      "name": "PET보틀-정사각(420ml)",
      "price": "43400",
      "img": "/images/img1.png"
    }
  },
*/

export const CheckoutProductItem = (props) => {
  const { quantity, item, ...rest } = props;
  const { name, img } = item;

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
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  item: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
  }),
};
