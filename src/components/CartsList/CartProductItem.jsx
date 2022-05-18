import styled from 'styled-components';
import { COLOR } from '../../constants/styles';
import { BasicButton, BasicImage, Flex } from '../shared/basics';
import { ReactComponent as Bin } from '../shared/Bin.svg';

function CartProductItem() {
  return (
    <Style.CartProductContainer justify="space-between">
      <Flex justify="space-between" gap="20px">
        <Style.CheckBox name="checkbox" type="checkbox" checked="true" />
        <BasicImage
          size="small"
          src="https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg"
        />
        <span>[든든] 야채바삭 김말이 700g</span>
      </Flex>
      <Flex direction="column" justify="space-between" align="flex-end">
        <Bin />
        <Flex justify="center" align="center">
          <Style.NumberInput type="number" value="1" />
          <Style.NumberInputBox>
            <Style.NumberInputButton type="button">▲</Style.NumberInputButton>
            <Style.NumberInputButton type="button">▼</Style.NumberInputButton>
          </Style.NumberInputBox>
        </Flex>
        <span>4,800원</span>
      </Flex>
    </Style.CartProductContainer>
  );
}

export default CartProductItem;

const Style = {
  CartProductContainer: styled(Flex)`
    padding: 23px 0;
    border-bottom: 2px solid lightgray;
  `,
  CheckBox: styled.input`
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
    &:checked {
      background-color: ${COLOR.PRIMARY};
    }
    &::after {
      content: '✔';
      width: 30px;
      height: 100%;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
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
