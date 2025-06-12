import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import * as S from './OrderConfirmPage.styles';
import { useNavigate, useLocation } from 'react-router';
import OrderConfirmSection from '../../components/OrderConfirmSection/OrderConfirmSection';
import Text from '../../components/Text/Text';
import CouponModal from '../../components/Modal/Modal';
import { useMemo } from 'react';
import { Content } from '../../types/cartItems';
import { useOrderSelections } from '../../hooks/useOrderSelection';
import { useOrderPrice } from '../../hooks/useOrderPrice';
import { useOrderDiscount } from '../../hooks/useOrderDiscount';

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedItems = useMemo(() => location.state?.selectedItems ?? [], [location.state?.selectedItems]);

  const {
    isIslandChecked,
    setIsIslandChecked,
    isModalOpen,
    setIsModalOpen,
    selectedCoupons,
    setSelectedCoupons,
    selectedItemIds,
  } = useOrderSelections(selectedItems);

  const { orderPrice, shippingFee, orderTotalPrice, totalQuantity } = useOrderPrice(selectedItems, isIslandChecked);

  const { totalDiscount, totalPrice } = useOrderDiscount(selectedCoupons, selectedItems, orderPrice, shippingFee);

  const fakeCartItemsResponse = {
    content: selectedItems,
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: false,
      unpaged: true,
    },
    last: true,
    totalElements: selectedItems.length,
    totalPages: 1,
    size: selectedItems.length,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    numberOfElements: selectedItems.length,
    empty: selectedItems.length === 0,
  };

  const handleNavigateClick = () => {
    navigate('/completed', {
      state: {
        kind: selectedItems.length,
        quantity: selectedItems.reduce((sum: number, item: Content) => sum + item.quantity, 0),
        orderTotalPrice: selectedItems.reduce(
          (sum: number, item: Content) => sum + item.product.price * item.quantity,
          0
        ),
        totalPrice: totalPrice,
      },
    });
  };

  const onTitleClick = () => {
    navigate('/');
  };

  if (!selectedItems.length) return <Text variant="title-1">선택된 상품이 없습니다</Text>;

  return (
    <>
      <Header title="🔙" handleTitleClick={onTitleClick} />
      <OrderConfirmSection
        itemsData={{
          items: fakeCartItemsResponse,
          selectedItemIds,
        }}
        stateHandlers={{
          setIsModalOpen,
          setIsIslandChecked,
          isIslandChecked,
        }}
        priceInfo={{
          orderPrice,
          shippingFee,
          orderTotalPrice,
          totalDiscount,
          totalQuantity,
          totalPrice,
        }}
      />

      <S.ButtonWrapper>
        <Button
          css={css`
            height: 48px;
          `}
          onClick={handleNavigateClick}
        >
          결제하기
        </Button>
      </S.ButtonWrapper>
      {isModalOpen && (
        <CouponModal
          onClose={() => setIsModalOpen(false)}
          selectedCoupons={selectedCoupons}
          setSelectedCoupons={setSelectedCoupons}
          totalDiscount={totalDiscount}
          orderPrice={orderPrice}
          selectedItems={selectedItems}
        />
      )}
    </>
  );
}
