import PropTypes from 'prop-types';
import { getFormattedAsKRW } from '../../../../utils';
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

export const OrderedItem = (props) => {
  const { quantity, item } = props;
  const { name, price, img } = item;
  const totalPriceAsKRW = getFormattedAsKRW(price * quantity);

  return (
    <Styled.Container>
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

OrderedItem.propTypes = {
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
  }),
};
