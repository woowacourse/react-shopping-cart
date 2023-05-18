import CheckBox from 'components/@common/CheckBox/CheckBox';
import FlexBox from 'components/@common/FlexBox';
import CartProductCardList from 'components/CartProductCardList/CartProductCardList';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPrice } from 'state/cartProducts';
import styled from 'styled-components';

const SHIPPING_FEE = 3000;

const ShoppingCartPage = () => {
  const { checkedProducts, isChecked, isAllChecked, toggleCheck, toggleCheckAllBox } = useCartCheckBox();
  const cartTotalPrice = useRecoilValue(checkedCartProductsTotalPrice(checkedProducts));
  const isCheckedProductsExist = checkedProducts.size > 0;
  const cartTotalPriceWithFee = cartTotalPrice + SHIPPING_FEE;

  const checkBoxLabel = isAllChecked ? '선택해제' : '전체선택';
  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = isCheckedProductsExist ? `+${SHIPPING_FEE.toLocaleString('ko-KR')}원` : '0원';
  const cartTotalPriceText = isCheckedProductsExist ? `${cartTotalPriceWithFee.toLocaleString('ko-KR')}원` : '0원';
  const orderConfirmButtonText = isCheckedProductsExist
    ? `총 ${checkedProducts.size}건 주문하기(${cartTotalPriceWithFee.toLocaleString('ko-KR')}원)`
    : '주문하기';

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <FlexBox gap="100px" align="flex-start" role="region">
        <CartProductSection flexDirection="column" align="flex-start">
          <CheckBoxTab justify="space-between" align="flex-end">
            <CheckBox checked={isAllChecked} onChange={toggleCheckAllBox}>
              {checkBoxLabel}
            </CheckBox>
            <CheckedProductDeleteButton>선택 삭제</CheckedProductDeleteButton>
          </CheckBoxTab>
          <CartProductCardList toggleCheck={toggleCheck} isChecked={isChecked} />
        </CartProductSection>
        <PriceSection flexDirection="column" gap="10px">
          <Container justify="space-between">
            <SubTitle>총 상품가격</SubTitle>
            <ProductTotalPrice>{productTotalPriceText}</ProductTotalPrice>
          </Container>
          <Container justify="space-between">
            <SubTitle>배송비</SubTitle>
            <ShippingFee>{shippingFeeText}</ShippingFee>
          </Container>
          <Container justify="space-between">
            <SubTitle>예상 주문금액</SubTitle>
            <CartTotalPrice>{cartTotalPriceText}</CartTotalPrice>
          </Container>
          <OrderConfirmButton isActive={isCheckedProductsExist}>{orderConfirmButtonText}</OrderConfirmButton>
        </PriceSection>
      </FlexBox>
    </>
  );
};

export default ShoppingCartPage;

const CartProductSection = styled(FlexBox)`
  position: relative;
  width: 70%;
`;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 30%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;
`;

const CheckBoxTab = styled(FlexBox)`
  position: sticky;
  top: 80px;
  z-index: 10;
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
  border-bottom: 3px solid #dddddd;
  background-color: #ffffff;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #dddddd;
`;

const CheckedProductDeleteButton = styled.button`
  width: 100px;
  height: 30px;
  border: solid 1px #dddddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  background-color: #f2f2f2;
  cursor: pointer;
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const ProductTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const ShippingFee = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const CartTotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const OrderConfirmButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: none;
  color: ${({ isActive }) => (isActive ? '#fff' : '#b1b3b5')};
  font-size: 18px;
  font-weight: 700;
  background-color: ${({ isActive }) => (isActive ? '#2ac1bc' : '#0000000d')};
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'initial' : 'none')};
`;

const PageTitle = styled.h2`
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;
