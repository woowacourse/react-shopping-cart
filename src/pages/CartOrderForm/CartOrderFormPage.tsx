import Header from '../../components/Header/Header';
import Button from '../../components/common/Button/Button';
import { useRecoilValue } from 'recoil';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListState';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';
import styled from 'styled-components';
import Title from '../../components/common/Title/Title';
import { PriceTable } from '../../components/PriceTable/PriceTable';
import { totalCartPriceState } from '../../recoil/price/totalCartPriceState';
import { cartShippingFeeState } from '../../recoil/price/cartShippingFeeState';
import { finalCartPriceState } from '../../recoil/price/finalCartPriceState';
import { discountPriceByCouponListState } from '../../recoil/price/discountPriceByCouponListState';
import { totalCartItemQuantityState } from '../../recoil/cartItem/totalCartItemQuantityState';
import CartItem from '../../components/CartItem/CartItem';
import { useState } from 'react';
import CouponListModal from '../../components/CouponListModal/CouponListModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import useCouponList from '../../recoil/couponList/useCouponList';
import ListContainer from '../../components/common/ListContainer/ListContainer';
import ShippingAreaForm from '../../components/ShippingAreaForm/ShippingAreaForm';
import { requestOrders } from '../../apis/requests/order';
import { useErrorBoundary } from 'react-error-boundary';
import { useSelectedCartItemIdList } from '../../recoil/selectedCartItemList/useSelectedCartItemIdList';

// TODO: cartOrders 의 컴포넌트와 동일. 복붙으로 재사용하니 수정요망
const CartPageContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 50px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
`;

const CartOrderFormPage = () => {
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);

  const selectedCartItemList = cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId));
  const totalQuantity = useRecoilValue(totalCartItemQuantityState);

  const totalCartPrice = useRecoilValue(totalCartPriceState);
  const discountPrice = useRecoilValue(discountPriceByCouponListState);
  const shippingFee = useRecoilValue(cartShippingFeeState);
  const finalCartPrice = useRecoilValue(finalCartPriceState);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { couponList } = useCouponList();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { clearSelectedCartItemIdList } = useSelectedCartItemIdList();
  const { showBoundary } = useErrorBoundary();
  const completeOrder = async () => {
    try {
      await requestOrders(selectedCartItemList.map(({ cartItemId }) => cartItemId));
      clearSelectedCartItemIdList();

      navigate(ROUTES.CART_ORDER_COMPLETE, {
        state: {
          selectedCartItemLength: selectedCartItemList.length,
          totalQuantity,
          finalCartPrice,
        },
      });
    } catch (error) {
      showBoundary(new Error('결제 요청에 실패했습니다.'));
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Header type="back" />
      <CartPageContainer>
        <Title
          title="주문 확인"
          description={`총 ${selectedCartItemList.length}종류의 상품 ${totalQuantity}개를 주문합니다. \n최종 결제 금액을 확인해주세요.`}
        />
        <ListContainer direction="column" gap="20px">
          {selectedCartItemList.map((cartItem) => (
            <CartItem {...cartItem} />
          ))}
        </ListContainer>
        <Button
          width="full"
          onClick={openModal}
          disabled={couponList.every(({ isApplicable }) => isApplicable === false)}
        >
          쿠폰 적용
        </Button>

        <ShippingAreaForm />
        <PriceTable>
          <PriceTable.Row name="주문 금액" price={totalCartPrice} />
          <PriceTable.Row name="쿠폰 할인 금액" price={discountPrice.price === 0 ? 0 : -discountPrice.price} />
          <PriceTable.Row name="배송비" price={discountPrice.shippingFee === 'free' ? '무료 배송' : shippingFee} />
          <PriceTable.Row name="총 결제 금액" price={finalCartPrice} upperDivider />
        </PriceTable>
      </CartPageContainer>

      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        onClick={completeOrder}
      >
        결제하기
      </Button>

      <CouponListModal isOpen={isModalOpen} close={closeModal} />
    </>
  );
};

export default CartOrderFormPage;
