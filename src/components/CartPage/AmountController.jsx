import styled from 'styled-components';

function AmountController() {
  return (
    <Styled.NumberInputContainer>
      <Styled.NumberInput type="number" value="1" />
      <div>
        <Styled.ContollerButton>▲</Styled.ContollerButton>
        <Styled.ContollerButton>▼</Styled.ContollerButton>
      </div>
    </Styled.NumberInputContainer>
  );
}

export default AmountController;

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
  `,
};
