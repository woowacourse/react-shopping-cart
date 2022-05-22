import styled from 'styled-components';
import { ReactComponent as PlusIcon } from 'assets/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/minus_icon.svg';

const Styled = {
  Container: styled.div`
    position: absolute;
    display: flex;
    border-radius: 25px;
    width: 180px;
    height: 50px;
    bottom: 90px;
    left: 45px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 4px rgb(0 0 0 / 20%);
    align-items: center;
    justify-content: space-around;
  `,

  Quantity: styled.p`
    font-weight: 500;
    font-size: 25px;
    color: ${({ theme }) => theme.colors.mint_001};
  `,

  Increase: styled(PlusIcon)`
    cursor: pointer;
    padding: 10px;
  `,

  Decrease: styled(MinusIcon)`
    cursor: pointer;
    padding: 10px;
  `,
};

export default Styled;
