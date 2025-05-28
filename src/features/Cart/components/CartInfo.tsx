import { css } from '@emotion/react';

import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Text } from '@/shared/components/Text';

import { CartItemDetail } from './CartItemDetail';
import { PriceSummary } from './PriceSummary';

import { StepProps } from '../../../shared/types/funnel';
import { CartListContainer } from '../container/CartListContainer';
import { useCart } from '../hooks/useCart';

export const CartInfo = ({ onNext }: StepProps) => {
  const { cartItems, toggleCheck, toggleAllCheck, removeCartItem, updateQuantity } = useCart();
  const allChecked = cartItems?.every((item) => item.isChecked);
  const cartItemCount = cartItems?.length ?? 0;
  const selectedCartItemCount = cartItems?.filter((item) => item.isChecked).length ?? 0;

  return (
    <>
      <Header
        left={
          <Text type="Heading" weight="semibold" color="white">
            SHOP
          </Text>
        }
      />
      {cartItems?.length === 0 ? (
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap="0px"
          width="100%"
          height="100%"
          padding="20px 20px 10px 20px"
        >
          <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="0"
            width="100%"
            height="100%"
          >
            <Text type="Title">장바구니가 비어있습니다.</Text>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap="10px"
            width="100%"
            padding="20px 20px 10px 20px"
          >
            <Text type="Heading" weight="semibold">
              장바구니
            </Text>
            <Text type="Caption" weight="regular">
              {`현재 ${cartItemCount}종류의 상품이 담겨있습니다.`}
            </Text>
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="10px"
              margin="10px 0 0 0"
            >
              <CheckBox checked={allChecked} onClick={toggleAllCheck} />
              <Text type="Caption" weight="regular">
                {`전체선택  (${selectedCartItemCount}/${cartItemCount})`}
              </Text>
            </Flex>
          </Flex>
          <CartListContainer>
            {cartItems?.map((item) => (
              <CartItemDetail
                key={item.id}
                onToggle={toggleCheck}
                onRemove={removeCartItem}
                onUpdateQuantity={updateQuantity}
                {...item}
              />
            ))}
          </CartListContainer>
          <PriceSummary cartItems={cartItems ?? []} />
        </>
      )}
      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        onClick={onNext}
        disabled={cartItems?.length === 0}
      >
        주문 확인
      </Button>
    </>
  );
};
