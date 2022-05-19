import styled from 'styled-components';
import { BasicButton, Flex } from './basics';

function NumberInput() {
  return (
    <Flex justify="center" align="center">
      <Style.NumberInput type="number" defaultValue={1} />
      <Style.NumberInputBox>
        <Style.NumberInputButton type="button">▲</Style.NumberInputButton>
        <Style.NumberInputButton type="button">▼</Style.NumberInputButton>
      </Style.NumberInputBox>
    </Flex>
  );
}

export default NumberInput;

const Style = {
  NumberInput: styled.input`
    width: 72px;
    height: 58px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 24px;
  `,
  NumberInputBox: styled.div`
    height: 100%;
  `,
  NumberInputButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    border: 1px solid #dddddd;
    font-size: 8px;
    height: 50%;
    cursor: pointer;
  `,
};
