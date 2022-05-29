import { Button } from 'components';
import styled from 'styled-components';

const Styled = {
  Container: styled.main`
    width: 1269px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 140px;
    padding: 40px;
    overflow: scroll;
    height: 100%;
    display: flex;
    flex-direction: column;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  Title: styled.p`
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    letter-spacing: 0.5px;
    margin: 29px 0;
  `,

  Division: styled.hr`
    width: inherit;
    height: 4px;
    background-color: black;
  `,

  SelectController: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 28px 0;
  `,

  CheckBoxContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;

    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;
  `,

  ProductListTitle: styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 33px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #aaaaaa;
    padding: 16px 0;
  `,

  ProductList: styled.div`
    overflow: scroll;
    height: 670px;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  OrderSheet: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
  `,

  LeftSide: styled.div``,

  RightSide: styled.div`
    padding-top: 100px;
  `,

  Empty: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProductDeleteButton: styled(Button)`
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid #bbbbbb;
    padding: 12px 22px;
  `,
};

export default Styled;
