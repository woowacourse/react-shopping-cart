import PropTypes from 'prop-types';
import * as Styled from './style.js';
import { PATTERN_ONLY_NUMBER } from '../../../../constants';
import { Button, Checkbox, TrashCanIcon, QuantityStepper } from '../../../commons';
import { getFormattedAsKRW } from '../../../../utils';

const MIN_PRODUCT_QUANTITY = 1;
const MAX_PRODUCT_QUANTITY = 99;

export const CartProductItem = (props) => {
  const {
    product,
    removeProduct,
    toggleCheckbox,
    incrementQuantity,
    decrementQuantity,
    inputQuantity,
    ...rest
  } = props;
  const { id, name, price, img, quantity, isSelected } = product;

  const onIncrementQuantity = () => {
    if (quantity >= MAX_PRODUCT_QUANTITY) {
      return;
    }
    incrementQuantity(id);
  };
  const onDecrementQuantity = () => {
    if (quantity <= MIN_PRODUCT_QUANTITY) {
      return;
    }
    decrementQuantity(id);
  };
  const onInputQuantity = ({ target }) => {
    const inputValue = target.value.replace(PATTERN_ONLY_NUMBER, '');

    /* 빈 문자열(falsy)을 숫자연산 하기 전에 처리 */
    if (inputValue === '') {
      inputQuantity(id, inputValue);
      return;
    }
    if (inputValue < MIN_PRODUCT_QUANTITY || inputValue > MAX_PRODUCT_QUANTITY) {
      return;
    }
    inputQuantity(id, inputValue);
  };

  return (
    <Styled.Container {...rest}>
      <Checkbox isChecked={isSelected} onChange={() => toggleCheckbox(id)} />
      <Styled.Image src={img} />
      <Styled.Name>{name}</Styled.Name>
      <Styled.Controller>
        <Button children={<TrashCanIcon />} onClick={() => removeProduct(id)} />
        <QuantityStepper
          quantity={quantity}
          onIncrement={onIncrementQuantity}
          onDecrement={onDecrementQuantity}
          onInput={onInputQuantity}
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
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelected: PropTypes.bool,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  inputQuantity: PropTypes.func.isRequired,
};
