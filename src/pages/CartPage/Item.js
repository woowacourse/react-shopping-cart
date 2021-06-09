import PropTypes from 'prop-types';

import { Button, Checkbox, IconTrashCan, QuantityStepper } from '../../components';
import * as S from './style.js';
import { getFormattedAsKRW } from '../../utils';
import { PATTERN_ONLY_NUMBER } from '../../constants';

const MIN_PRODUCT_QUANTITY = 1;
const MAX_PRODUCT_QUANTITY = 99;

export const Item = (props) => {
  const {
    product,
    removeProduct,
    toggleCheckbox,
    incrementQuantity,
    decrementQuantity,
    inputQuantity,
    ...rest
  } = props;
  const { productId, name, price, imageUrl, cartIds, isSelected } = product;
  const quantity = cartIds.length;

  const onIncrementQuantity = () => {
    if (quantity >= MAX_PRODUCT_QUANTITY) {
      return;
    }
    incrementQuantity(productId);
  };
  const onDecrementQuantity = () => {
    if (quantity <= MIN_PRODUCT_QUANTITY) {
      return;
    }
    decrementQuantity(productId);
  };
  const onInputQuantity = ({ target }) => {
    const inputValue = target.value.replace(PATTERN_ONLY_NUMBER, '');

    /* 빈 문자열(falsy)을 숫자연산 하기 전에 처리 */
    if (inputValue === '') {
      inputQuantity(productId, inputValue);
      return;
    }
    if (inputValue < MIN_PRODUCT_QUANTITY || inputValue > MAX_PRODUCT_QUANTITY) {
      return;
    }
    inputQuantity(productId, inputValue);
  };

  return (
    <S.Container {...rest}>
      <Checkbox isChecked={isSelected} onChange={() => toggleCheckbox(productId)} />
      <S.Image src={imageUrl} />
      <S.Name>{name}</S.Name>
      <S.Controller>
        <Button children={<IconTrashCan />} onClick={() => removeProduct(productId)} />
        <QuantityStepper
          quantity={quantity}
          onIncrement={onIncrementQuantity}
          onDecrement={onDecrementQuantity}
          onInput={onInputQuantity}
        />
        <S.Price>{getFormattedAsKRW(price)}</S.Price>
      </S.Controller>
    </S.Container>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelected: PropTypes.bool,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  inputQuantity: PropTypes.func.isRequired,
};
