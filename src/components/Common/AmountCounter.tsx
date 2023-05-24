import styled, { css } from 'styled-components';

import ArrowUpIcon from '../../assets/ArrowUpIcon';
import ArrowDownIcon from '../../assets/ArrowDownIcon';

type DesignType = 'main' | 'cart';
type DesignProps = Pick<AmountCounterProps, 'designType'>;

interface AmountCounterProps {
  designType: DesignType;
  count: number;
  addCount: () => void;
  subtractCount: () => void;
}

const counterStyles = {
  main: {
    group: css`
      height: 28px;
    `,
    input: css`
      width: 42px;
      font-size: 16px;
    `,
    button: css`
      width: 24px;
      height: 14px;
    `,
  },
  cart: {
    group: css`
      height: 45px;
    `,
    input: css`
      width: 53px;
      font-size: 20px;
    `,
    button: css`
      width: 32px;
    `,
  },
};

const AmountCounter = ({
  designType,
  count,
  addCount,
  subtractCount,
}: AmountCounterProps) => {
  return (
    <InputGroup designType={designType}>
      <CounterInput
        type='number'
        value={count}
        readOnly
        designType={designType}
      />
      <CountBtnContainer>
        <CountBtn
          designType={designType}
          onClick={addCount}
          aria-label='수량 더하기 버튼'
        >
          <ArrowUpIcon />
        </CountBtn>
        <CountBtn
          designType={designType}
          onClick={subtractCount}
          aria-label='수량 빼기 버튼'
        >
          <ArrowDownIcon />
        </CountBtn>
      </CountBtnContainer>
    </InputGroup>
  );
};

const InputGroup = styled.div<DesignProps>`
  display: flex;
  ${({ designType }) => counterStyles[designType].group}
`;

const CounterInput = styled.input<DesignProps>`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  outline: none;
  ${({ designType }) => counterStyles[designType].input}

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;

const CountBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
`;

const CountBtn = styled.button<DesignProps>`
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  flex: 1;

  ${({ designType }) => counterStyles[designType].button}
`;

export default AmountCounter;
