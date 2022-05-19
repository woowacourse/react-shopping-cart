import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuantityInput = ({ cartQuantity }) => {
  return (
    <Styled.InputWrapper>
      <Styled.NumberInput value={cartQuantity} />
      <div>
        <Styled.NumberInputButton>▲</Styled.NumberInputButton>
        <Styled.NumberInputButton>▼</Styled.NumberInputButton>
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
