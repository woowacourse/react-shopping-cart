import PropTypes from 'prop-types';
import { AmountCounter, CheckBox, RowProductItem, TrashCanIcon } from '../..';
import { numberWithCommas } from '../../../utils';
import { AMOUNT_COUNTER_FLAG } from '../../../constants';
import { ShoppingCartItemContainer, ShoppingCartItemRow, ShoppingCartItemOption } from './ShoppingCartItem.styles';

const ShoppingCartItem = ({
  productId,
  onClickCheckBox,
  onClickDeleteButton,
  onClickAmountCounter,
  img,
  name,
  price,
  amount,
  isChecked,
}) => (
  <ShoppingCartItemContainer>
    <ShoppingCartItemRow>
      <CheckBox id={productId} onClick={onClickCheckBox} isChecked={isChecked} />
      <RowProductItem imgSrc={img} name={name} />
    </ShoppingCartItemRow>

    <ShoppingCartItemOption>
      <button type="button" onClick={() => onClickDeleteButton(productId)}>
        <TrashCanIcon />
      </button>
      <AmountCounter
        value={amount}
        onClickUp={() => onClickAmountCounter(productId, AMOUNT_COUNTER_FLAG.UP)}
        onClickDown={() => onClickAmountCounter(productId, AMOUNT_COUNTER_FLAG.DOWN)}
      />
      <span>{`${numberWithCommas(price * amount)}원`}</span>
    </ShoppingCartItemOption>
  </ShoppingCartItemContainer>
);

ShoppingCartItem.propTypes = {
  productId: PropTypes.string.isRequired,
  onClickCheckBox: PropTypes.func.isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
  onClickAmountCounter: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default ShoppingCartItem;
