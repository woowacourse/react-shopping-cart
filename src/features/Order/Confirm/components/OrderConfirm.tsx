import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { CartItemList } from '@/features/Cart/types/Cart.types';
import { Button } from '@/shared/components/Button';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

import { orderConfirm } from '../../../Cart/utils/orderConfirm';

export const OrderConfirm = ({
  cartItems,
  totalDiscountPrice,
}: CartItemList & { totalDiscountPrice: number }) => {
  const navigate = useNavigate();
  const { hasCheckCartLength, totalQuantity } = orderConfirm({ cartItems });

  const handleNavigateCartPage = () => {
    navigate('/cart');
  };

  return (
    <>
      <Header />
      <Flex direction="column" justifyContent="center" alignItems="center" gap="30px" height="100%">
        <Text type="Heading" weight="bold">
          결제 확인
        </Text>
        <Text type="Caption" weight="regular">
          {`총 ${hasCheckCartLength}종류의 상품 ${totalQuantity}개를 주문합니다.\n 최종 결제 금액을 확인해 주세요.`}
        </Text>
        <Text type="Heading" weight="bold">
          {`총 결제 금액 ${totalDiscountPrice?.toLocaleString()}원`}
        </Text>
      </Flex>
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        onClick={handleNavigateCartPage}
      >
        장바구니로 돌아가기
      </Button>
    </>
  );
};
