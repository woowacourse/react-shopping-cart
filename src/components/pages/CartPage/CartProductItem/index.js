import PropTypes from 'prop-types';
import * as Styled from './style.js';
import { useQuantityStepper } from '../../../../hooks';
import { Button, Checkbox, TrashCanIcon, QuantityStepper } from '../../../commons';
import { getFormattedAsKRW } from '../../../../utils';

/*
  item 데이터 형식
  {
    "id": "1",
    "name": "PET보틀-정사각(420ml)",
    "price": "43400",
    "img": "/mockImages/img1.png"
  },
*/

export const CartProductItem = (props) => {
  const { item, ...rest } = props;
  const { name, price, img } = item;
  const { quantity, handleQuantityChange, handleIncrement, handleDecrement } = useQuantityStepper();

  return (
    <Styled.Container {...rest}>
      <Checkbox />
      <Styled.Image src={img} />
      <Styled.Name>{name}</Styled.Name>
      <Styled.Controller>
        <Button children={<TrashCanIcon />} />
        <QuantityStepper
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <Styled.Price>{getFormattedAsKRW(price)}</Styled.Price>
      </Styled.Controller>
    </Styled.Container>
  );
};

CartProductItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
  }),
};
