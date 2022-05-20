import styled from 'styled-components';
import { LIMIT } from 'constants';
import PropType from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartQuantity } from 'store/carts';

function AmountController({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);

  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (quantity < LIMIT.MAX_QUANTITY) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    dispatch(updateCartQuantity({ ...product, quantity }));
  }, [quantity]);

  return (
    <Styled.NumberInputContainer>
      <Styled.NumberInput type="number" value={quantity} disabled />
      <div>
        <Styled.ContollerButton
          disabled={quantity === LIMIT.MAX_QUANTITY}
          onClick={increaseQuantity}
        >
          ▲
        </Styled.ContollerButton>
        <Styled.ContollerButton
          disabled={quantity === LIMIT.MIN_QUANTITY}
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
  ContollerButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    border: 1px solid #dddddd;
    font-size: 100%;
    cursor: pointer;
    background-color: white;
    height: 29px;
  `,
};
