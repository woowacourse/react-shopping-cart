import { PageExplanation } from '@components/common';
import { PurchaseProcessLayout } from '@components/layout';
import { CouponModalContainer, OrderAmountsList, SelectedItemList, ShippingInfo } from '@components/orderConfirm';
import { useAvailableCoupons, useSelectedCartItems } from '@hooks/index';
import { availableCouponsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const OrderConfirmPage: React.FC = () => {
  const setAvailableCoupons = useSetRecoilState(availableCouponsAtom);
  const { getAvailableCoupons } = useAvailableCoupons();

  const navigate = useNavigate();
  const { totalSelectedItemLength, selectedTotalQuantity, selectedItems } = useSelectedCartItems();

  const handleClickBottomButton = () => {
    navigate(ROUTE_PATHS.purchaseConfirm);
  };

  useEffect(() => {
    setAvailableCoupons(getAvailableCoupons());
  }, []);

  return (
    <PurchaseProcessLayout
      pageTitle="주문 확인"
      handleBottomBtnClick={handleClickBottomButton}
      bottomButtonText="결제하기"
    >
      <PageExplanation>
        <PageExplanation.Row>
          총 {totalSelectedItemLength}종류의 상품 {selectedTotalQuantity}개를 주문합니다.
        </PageExplanation.Row>
        <PageExplanation.Row>최종 결제 금액을 확인해주세요.</PageExplanation.Row>
      </PageExplanation>
      <SelectedItemList selectedItems={selectedItems} />
      <CouponModalContainer />
      <ShippingInfo />
      <OrderAmountsList />
    </PurchaseProcessLayout>
  );
};

export default OrderConfirmPage;
