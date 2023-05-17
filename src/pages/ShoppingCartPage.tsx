import CheckBox from 'components/@common/CheckBox/CheckBox';
import FlexBox from 'components/@common/FlexBox';
import CartProductCardList from 'components/CartProductCardList/CartProductCardList';
import useCartCheckBox from 'hooks/useCartCheckBox';
import { useRecoilValue } from 'recoil';
import { cartProductsState, cartTotalPriceState } from 'state/cartProducts';
import styled from 'styled-components';

const SHIPPING_FEE = 3000;

const ShoppingCartPage = () => {
  const { checkedBoxes, isAllChecked, toggleCheckAllBox } = useCartCheckBox();
  const cartProducts = useRecoilValue(cartProductsState);
  const cartTotalPrice = useRecoilValue(cartTotalPriceState);
  const cartProductsCount = cartProducts.size;
  const cartTotalPriceWithFee = cartTotalPrice + SHIPPING_FEE;

  const checkBoxText = isAllChecked ? '선택해제' : '전체선택';
  const productTotalPriceText = `${cartTotalPrice.toLocaleString('ko-KR')}원`;
  const shippingFeeText = `+${SHIPPING_FEE.toLocaleString('ko-KR')}원`;
  const wholePriceText = `${cartTotalPriceWithFee.toLocaleString('ko-KR')}원`;
  const orderConfirmButtonText = `총 ${cartProductsCount}건 주문하기
  (${cartTotalPriceWithFee.toLocaleString('ko-KR')}원)`;

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <FlexBox gap="100px" align="flex-start" role="region">
        <CartProductListContainer flexDirection="column" align="flex-start">
          <Container justify="space-between">
            <CheckBox checked={isAllChecked} onChange={toggleCheckAllBox}>
              {checkBoxText}
            </CheckBox>
            <CartProductDeleteButton>선택 삭제</CartProductDeleteButton>
          </Container>
          <CartProductCardList />
        </CartProductListContainer>
        <WholePriceContainer flexDirection="column" gap="10px">
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
            <WholePrice>{wholePriceText}</WholePrice>
          </Container>
          <OrderConfirmButton>{orderConfirmButtonText}</OrderConfirmButton>
        </WholePriceContainer>
      </FlexBox>
    </>
  );
};

export default ShoppingCartPage;

const CartProductListContainer = styled(FlexBox)`
  position: relative;
  width: 70%;
`;

const WholePriceContainer = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 30%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 60px;
`;

const CartProductDeleteButton = styled.button`
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

const WholePrice = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const OrderConfirmButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  background-color: #2ac1bc;
  cursor: pointer;
`;

const PageTitle = styled.h2`
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;
