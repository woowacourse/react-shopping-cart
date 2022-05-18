import styled from 'styled-components';
import { COLOR } from '../../constants/styles';
import { BasicButton, BasicDivideLine, Flex } from '../shared/basics';
import CartProductItem from './CartProductItem';

function CartContainer() {
  return (
    <Style.CartContainer>
      <Style.CartSectionHeader>
        <Style.CartSectionTitle>장바구니</Style.CartSectionTitle>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.CartSectionHeader>
      <Style.CartItemsContainer>
        <Style.CartLeftSection>
          <Style.CartCheckBoxContainer justify="space-between" align="center">
            <Flex align="center">
              <Style.CheckBox name="checkbox" type="checkbox" checked />
              <Style.CheckBoxLabel for="checkbox">선택해제</Style.CheckBoxLabel>
            </Flex>
            <Style.DeleteButton type="button">상품삭제</Style.DeleteButton>
          </Style.CartCheckBoxContainer>
          <Style.CartTitle>든든배송 상품(3개)</Style.CartTitle>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />
          <CartProductItem />
          <CartProductItem />
          <CartProductItem />
          <CartProductItem />
        </Style.CartLeftSection>
        <Style.CartRightSection>
          <Style.CartRightSectionTop>
            <h3 className="cart-title">결제예상금액</h3>
          </Style.CartRightSectionTop>
          <BasicDivideLine weight="thin" color="lightgray" />
          <div>
            <Style.TotalPriceBox justify="space-between">
              <Style.HighLightText>결제예상금액</Style.HighLightText>
              <Style.HighLightText className="highlight-text">
                21,800원
              </Style.HighLightText>
            </Style.TotalPriceBox>
            <Style.OrderButtonWrapper
              justify="center"
              align="center"
              className="flex-center mt-30 mx-10"
            >
              <Style.OrderButton type="button">주문하기(3개)</Style.OrderButton>
            </Style.OrderButtonWrapper>
          </div>
        </Style.CartRightSection>
      </Style.CartItemsContainer>
    </Style.CartContainer>
  );
}

export default CartContainer;

const Style = {
  CartContainer: styled.section`
    padding: 24px 300px;
  `,
  CartSectionHeader: styled.header`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  `,
  CartItemsContainer: styled(Flex)`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  `,
  CartCheckBoxContainer: styled(Flex)`
    margin: 20px 0;
  `,
  CartSectionTitle: styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  `,
  DeleteButton: styled(BasicButton)`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
  `,
  CheckBox: styled.input`
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
  `,
  CheckBoxLabel: styled.label`
    padding-left: 7px;
  `,

  CartLeftSection: styled.section`
    width: 60%;
  `,
  CartRightSection: styled.section`
    width: 35%;
    height: 260px;
    margin-top: 80px;

    border: 1px solid #dddddd;
  `,
  CartRightSectionTop: styled(Flex)`
    display: flex;
    align-items: center;
    padding: 16px 30px;
  `,
  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
  TotalPriceBox: styled(Flex)`
    padding: 20px;
    margin: 20px;
  `,
  HighLightText: styled.span`
    position: relative;
    font-weight: 700;
    display: inline-block;
    text-align: center;
    padding: 0 2px;
    font-size: 20px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8px;
      background-color: #2ac1bc;
      opacity: 0.5;
      z-index: -1;
    }
  `,
  OrderButtonWrapper: styled(Flex)`
    margin: 30px 10px 0px;
  `,
  OrderButton: styled(BasicButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLOR.PRIMARY};
    color: white;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    margin: 0 20px;
  `,
};
