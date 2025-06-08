import { css } from '@emotion/react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import * as S from './OrderConfirmPage.styles';
import { useNavigate, useLocation } from 'react-router';
import OrderConfirmSection from '../../components/OrderConfirmSection/OrderConfirmSection';
import { Content } from '../../types/cartItems';
import Text from '../../components/Text/Text';
import { useState } from 'react';
import CouponModal from '../../components/Modal/Modal';

export default function OrderConfirmPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems: Content[] = location.state?.selectedItems ?? [];

  const selectedItemIds = selectedItems.map((item) => item.id);

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
        quantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
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
        items={fakeCartItemsResponse}
        refetch={() => {}}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={() => {}}
        setIsModalOpen={setIsModalOpen}
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
      {isModalOpen && <CouponModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
