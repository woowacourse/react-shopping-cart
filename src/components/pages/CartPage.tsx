/* eslint-disable @typescript-eslint/no-empty-function */
import TotalPriceBox from '../box/TotalPriceBox/TotalPriceBox';
import { Text } from '../common/Text/Text';
import CartList from '../list/CartList/CartList';
import PageTemplate from '../templates/PageTemplate';
import styled from '@emotion/styled';
import Modal from '../common/Modal/Modal';
import DeleteCartItemModal from '../common/Modal/DeleteCartItemModal';
import { useCart } from '../../hooks/useCart';
import { useRecoilValue } from 'recoil';
import { checkCartListState } from '../../service/atom';

const CartPage = () => {
  const { data } = useCart();
  const checkCartList = useRecoilValue(checkCartListState);

  const calcTotalPrice = () => {
    return checkCartList
      .map((cartId) => {
        const cartItem = data && data.find((cart) => cart.id === cartId);
        if (cartItem) {
          return cartItem?.product.price * cartItem?.quantity;
        }
        return 0;
      })
      .reduce((prev, next) => prev + next, 0);
  };

  return (
    <PageTemplate
      title="장바구니 미션 - 장바구니페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 장바구니페이지입니다."
    >
      <CartPageWrapper>
        <CartPageHead>
          <Text size="extraLarge" weight="bold">
            장바구니
          </Text>
        </CartPageHead>
        <CartPageContent>
          <CartListWrapper>{<CartList />}</CartListWrapper>
          <PriceBox>
            <TotalPriceBox
              totalProductPrice={calcTotalPrice()}
              shippingFee={checkCartList.length > 0 ? 3000 : 0}
              isValid={checkCartList.length > 0}
            />
          </PriceBox>
        </CartPageContent>
      </CartPageWrapper>
      <Modal>
        <DeleteCartItemModal />
      </Modal>
    </PageTemplate>
  );
};

export default CartPage;

const CartPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1140px;
  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 350px;
  }
`;

const CartListWrapper = styled.div`
  width: 740px;
  margin-top: -50px;
  @media screen and (max-width: 1320px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const CartPageHead = styled.div`
  border-bottom: 4px solid #333;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  position: relative;
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PriceBox = styled.div`
  position: sticky;
  top: 150px;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;
