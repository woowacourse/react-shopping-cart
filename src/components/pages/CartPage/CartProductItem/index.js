import PropTypes from 'prop-types';
import * as Styled from './style.js';
import { useQuantityStepper } from '../../../../hooks';
import { Button, Checkbox, TrashCanIcon, QuantityStepper } from '../../../commons';
import { getFormattedAsKRW } from '../../../../utils';

export const CartProductItem = (props) => {
  const { product, onRemoveProduct, ...rest } = props;
  const { id, name, price, img, isSelected } = product;
  const { quantity, handleQuantityChange, handleIncrement, handleDecrement } = useQuantityStepper();

  return (
    <Styled.Container {...rest}>
      <Checkbox isChecked={isSelected} />
      <Styled.Image src={img} />
      <Styled.Name>{name}</Styled.Name>
      <Styled.Controller>
        <Button children={<TrashCanIcon />} onClick={() => onRemoveProduct(id)} />
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
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    img: PropTypes.string,
    isSelected: PropTypes.bool,
  }).isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
