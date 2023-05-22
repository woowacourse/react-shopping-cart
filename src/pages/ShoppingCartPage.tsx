import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { checkedCartProductsTotalPrice } from 'state/cartProducts';
import CartProductCardList from 'components/CartProductCardList/CartProductCardList';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import CheckBox from 'components/@common/CheckBox/CheckBox';
import FlexBox from 'components/@common/FlexBox';
import useModal from 'components/@common/Modal/hooks/useModal';
import useCartCheckBox from 'hooks/useCartCheckBox';
import useShoppingCart from 'hooks/useShoppingCart';
import emptyCartImg from 'assets/empty-cart.png';
import { Link } from 'react-router-dom';

const SHIPPING_FEE = 3000;

const ShoppingCartPage = () => {
  const { checkedProducts, isChecked, isAllChecked, toggleCheck, toggleCheckAllBox } = useCartCheckBox();
  const { cartProducts, deleteCheckedCartProducts } = useShoppingCart();
  const { isModalOpen, openModal, closeModal } = useModal();
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
    <ShoppingCartPageContainer flexDirection="column">
      <PageTitle>장바구니</PageTitle>
      {cartProducts.size ? (
        <SectionContainer gap="80px" align="flex-start" role="region">
          <CartProductSection flexDirection="column" align="flex-start">
            <CheckBoxTab justify="space-between" align="flex-end">
              <CheckBox checked={isAllChecked} onChange={toggleCheckAllBox}>
                {checkBoxLabel}
              </CheckBox>
              <CheckedProductDeleteButton onClick={openModal}>선택 삭제</CheckedProductDeleteButton>
              <ConfirmModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                onClickConfirmButton={() => deleteCheckedCartProducts(checkedProducts)}
              >
                {`선택한 ${checkedProducts.size}개의 상품을 삭제하시겠습니까?`}
              </ConfirmModal>
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
        </SectionContainer>
      ) : (
        <EmptyCartImgBackground flexDirection="column" gap="20px">
          <EmptyCartImg src={emptyCartImg} alt="장바구니가 텅 비었습니다." />
          <EmptyCartMessage>장바구니에 담긴 상품이 없습니다.</EmptyCartMessage>
          <GoHomeLink to="/">홈으로 가기</GoHomeLink>
        </EmptyCartImgBackground>
      )}
    </ShoppingCartPageContainer>
  );
};

export default ShoppingCartPage;

const ShoppingCartPageContainer = styled(FlexBox)`
  width: 100%;
`;

const SectionContainer = styled(FlexBox)`
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CartProductSection = styled(FlexBox)`
  position: relative;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PriceSection = styled(FlexBox)`
  position: sticky;
  top: 140px;
  width: 40%;
  margin-top: 60px;
  padding: 20px 26px;
  border: 1px solid #dddddd;
  background-color: #f2f2f2;

  @media (max-width: 1280px) {
    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 250px;
    margin: 0;
  }

  @media (max-width: 430px) {
    height: 100%;

    div {
      display: none;
    }
  }
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

  @media (max-width: 430px) {
    margin: 0;
  }
`;

const PageTitle = styled.h2`
  width: 100%;
  height: 80px;
  border-bottom: 3px solid #333333;
  font-size: 32px;
  text-align: center;
`;

const EmptyCartImgBackground = styled(FlexBox)`
  width: 100%;
  background-color: #f2f2f2;
  padding: 20px 0;
`;

const EmptyCartImg = styled.img`
  width: 150px;
  height: 150px;
`;

const EmptyCartMessage = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const GoHomeLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border-radius: 4px;
  background-color: #63cbff;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`;
