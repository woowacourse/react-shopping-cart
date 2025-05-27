import { AppLayout } from '@/shared/components/AppLayout';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';
import { CartListContainer } from '../container/CartListContainer';
import { CartItemDetail } from '../components/CartItemDetail';
import { cartData } from '@/shared/mock/cart.data';
import { PriceSummary } from '../components/PriceSummary';
import { Button } from '@/shared/components/Button';
import { css } from '@emotion/react';
import { useCart } from '../hooks/useCart';

export const CartPage = () => {
  const mockCartItem = cartData.content[0].product;
  const { cartItems, toggleCheck, toggleAllCheck, removeCartItem } = useCart();
  const allChecked = cartItems?.every((item) => item.isChecked);

  return (
    <AppLayout>
      <Header
        left={
          <Text type="Heading" weight="semibold" color="white">
            SHOP
          </Text>
        }
      />
      <Flex
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        gap={'10px'}
        width="100%"
        padding="20px 20px 10px 20px"
      >
        <Text type={'Heading'} weight="semibold">
          장바구니
        </Text>
        <Text type={'Caption'} weight="regular">
          현재 2종류의 상품이 담겨있습니다.
        </Text>
        <Flex
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'10px'}
          margin="10px 0 0 0"
        >
          <CheckBox checked={allChecked} onClick={toggleAllCheck} />
          <Text type={'Caption'} weight="regular">
            전체선택
          </Text>
        </Flex>
      </Flex>
      <CartListContainer>
        {cartItems?.map((item) => (
          <CartItemDetail
            key={item.id}
            onToggle={toggleCheck}
            onRemove={removeCartItem}
            {...item}
          />
        ))}
      </CartListContainer>
      <PriceSummary />
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: fixed;
          bottom: 0;
          max-width: 425px;
        `}
      >
        주문 확인
      </Button>
    </AppLayout>
  );
};
