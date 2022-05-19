import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const QuantityInput = ({ cartQuantity }) => {
  const numberInput = useRef(null);
  const [quantity, setQuantity] = useState(cartQuantity);
  const handleChangeInput = (e) => {
    setQuantity(e.target.value);
  };

  const handleClickStepUp = () => {
    numberInput.current.stepUp(1);
  };
  const handleClickStepDown = () => {
    numberInput.current.stepDown(1);
  };

  return (
    <Styled.InputWrapper>
      <Styled.NumberInput
        type="number"
        step="1"
        min="1"
        max="100"
        ref={numberInput}
        value={quantity}
        onChange={handleChangeInput}
      />
      <div>
        <Styled.NumberInputButton onClick={handleClickStepUp}>
          ▲
        </Styled.NumberInputButton>
        <Styled.NumberInputButton onClick={handleClickStepDown}>
          ▼
        </Styled.NumberInputButton>
      </div>
    </Styled.InputWrapper>
  );
};

QuantityInput.propTypes = {
  cartQuantity: PropTypes.number,
};

const Styled = {
  InputWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  NumberInput: styled.input`
    width: 70px;
    height: 58px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 24px;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  NumberInputButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dddddd;
    height: 29px;
    cursor: pointer;
  `,
};

export default QuantityInput;
