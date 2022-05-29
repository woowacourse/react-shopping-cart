import styled from 'styled-components';
import { LIMIT } from 'constants';
import PropType from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCart } from 'store/carts/action';
import { DefaultButton } from 'components/shared/styles';

function AmountController({ product }) {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (product.quantity < LIMIT.MAX_QUANTITY) {
      dispatch(updateCart({ ...product, quantity: product.quantity + 1 }));
    }
  };

  const decreaseQuantity = () => {
    if (product.quantity > 1) {
      dispatch(updateCart({ ...product, quantity: product.quantity - 1 }));
    }
  };

  return (
    <Styled.NumberInputContainer>
      <Styled.NumberInput type="number" value={product.quantity} disabled />
      <div>
        <Styled.ContollerButton
          disabled={product.quantity === LIMIT.MAX_QUANTITY}
          onClick={increaseQuantity}
        >
          ▲
        </Styled.ContollerButton>
        <Styled.ContollerButton
          disabled={product.quantity === LIMIT.MIN_QUANTITY}
          onClick={decreaseQuantity}
        >
          ▼
        </Styled.ContollerButton>
      </div>
    </Styled.NumberInputContainer>
  );
}

export default AmountController;

AmountController.propTypes = {
  product: PropType.shape({
    id: PropType.string,
    price: PropType.string,
    quantity: PropType.number,
    src: PropType.string,
    title: PropType.string,
  }).isRequired,
};

const Styled = {
  NumberInputContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  NumberInput: styled.input`
    width: 72px;
    height: 58px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 24px;
    background-color: white;

    &:focus {
      outline: none;
    }
  `,
  ContollerButton: styled(DefaultButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    border: 1px solid #dddddd;
    font-size: 100%;
    background-color: white;
    height: 29px;
  `,
};
