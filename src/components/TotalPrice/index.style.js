import styled from 'styled-components';
import { Button } from 'components';

const Styled = {
  Container: styled.div`
    width: 448px;
    height: 318px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
  `,

  Header: styled.div`
    width: 448px;
    height: 81px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    display: flex;
    padding: 25px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.5px;
  `,

  Body: styled.div`
    width: 448px;
    height: 237px;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  PriceContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Action: styled(Button)`
    width: 100%;
    height: 73px;
    font-weight: 400;
    font-size: 24px;
    line-height: 21px;
    background-color: ${({ theme }) => theme.colors.mint_001};
    color: ${({ theme }) => theme.colors.white};
  `,
};

export default Styled;
