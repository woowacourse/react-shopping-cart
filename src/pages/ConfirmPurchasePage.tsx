import styled from 'styled-components';
import Header from '../components/Header/Header';
import Title from '../components/common/Title/Title';
import CartItemList from '../components/CartItemList/CartItemList';
import PriceTable from '../components/PriceTable/PriceTable';
import { cartItemListState } from '../recoil/cartItemList/cartItemListSelector';
import { useRecoilValue } from 'recoil';
import { Suspense, useEffect } from 'react';
import useCartListItem from '../recoil/cartItemList/useCartItemList';
import Button from '../components/common/Button/Button';
import { cartItemSelectedIdListAtom } from '../recoil/cartItem/cartItemAtom';
import Text from '../components/common/Text/Text';
import { priceSelector } from '../recoil/price/priceSelector';
import { totalItemQuantitySelector } from '../recoil/cartItemList/totalItemQuantitySelector';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 30px 20px 80px 20px;
  min-height: 90%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const PriceContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const ConfirmPurchasePage = () => {
  const { updateCartItemList } = useCartListItem();

  useEffect(() => {
    updateCartItemList();
  }, []);

  const cartItemList = useRecoilValue(cartItemListState);
  const { totalPrice } = useRecoilValue(priceSelector);
  const totalQuantity = useRecoilValue(totalItemQuantitySelector);

  return (
    <>
      <Header type="back" />

      <CartPageContainer>
        <Text size="l" weight="l">
          주문 확인
        </Text>
        <Text size="s" weight="m">
          총 {cartItemList.length}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <PriceContainer>
          <Text size="m" weight="l">
            총 결제 금액
          </Text>
          <Text size="l" weight="l">
            {totalPrice.toLocaleString('ko-kr')}원
          </Text>
        </PriceContainer>
      </CartPageContainer>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: 'inherit' }}
        isDisabled
      >
        결제 확인
      </Button>
    </>
  );
};

export default ConfirmPurchasePage;
