import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import usePatch from 'hooks/shared/usePatch';
import useGetCartList from 'hooks/useGetCartList';

const QuantityInput = ({ itemId, cartQuantity }) => {
  const numberInput = useRef(null);
  const [newQuantity, setNewQuantity] = useState(+cartQuantity);
  const { callPatchApi } = usePatch(`/cartList/${itemId}`);
  const { getCartList } = useGetCartList();

  const handleChangeInput = async (e) => {
    setNewQuantity(+e.target.value);
    await callPatchApi(itemId, +e.target.value);
    await getCartList();
  };

  const handleClickStepUp = async () => {
    numberInput.current.stepUp(1);
    setNewQuantity(+numberInput.current.value);
    await callPatchApi(itemId, +numberInput.current.value);
    await getCartList();
  };

  const handleClickStepDown = async () => {
    numberInput.current.stepDown(1);
    setNewQuantity(+numberInput.current.value);
    await callPatchApi(itemId, +numberInput.current.value);
    await getCartList();
  };

  return (
    <Styled.InputWrapper>
      <Styled.NumberInput
        type="number"
        step="1"
        min="1"
        max="100"
        ref={numberInput}
        value={newQuantity}
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
  itemId: PropTypes.number,
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
