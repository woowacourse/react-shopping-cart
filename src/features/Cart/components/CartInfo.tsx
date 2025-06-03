import { css } from '@emotion/react';

import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Header } from '@/shared/components/Header';
import { Progress } from '@/shared/components/Progress';
import { Text } from '@/shared/components/Text';

import { CartItemDetail } from './CartItemDetail';
import { PriceSummary } from './PriceSummary';

import { StepProps } from '../../../shared/types/funnel';
import { CartListContainer } from '../container/CartListContainer';
import { useCartChecked } from '../hooks/useCartChecked';
import { useShippingProgress } from '../hooks/useShippingProgress';
import { CartItem } from '../types/Cart.types';

type CartInfoProps = {
  cartItems: CartItem[];
  onToggle: (id: number) => void;
  onToggleAll: VoidFunction;
  onRemove: (id: number) => void;
  onUpdateQuantity: (cartId: number, newQuantity: number) => void;
} & StepProps;

export const CartInfo = ({
  cartItems,
  onNext,
  onToggle,
  onToggleAll,
  onRemove,
  onUpdateQuantity,
}: CartInfoProps) => {
  const { allChecked, cartItemCount, selectedCartItemCount } = useCartChecked({ cartItems });
  const { progressValue, remainingForFreeShipping } = useShippingProgress({ cartItems });

  return (
    <>
      <Header
        left={
          <Text type="Heading" weight="semibold" color="white">
            SHOP
          </Text>
        }
      />

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
          <Flex
            direction="column"
            gap="10px"
            width="100%"
            margin="10px 0 0 0"
            justifyContent="center"
            alignItems="center"
          >
            {remainingForFreeShipping > 0 ? (
              <Text type="Caption" color="#666">
                {`${remainingForFreeShipping.toLocaleString()}원 더 구매하면 배송비 무료!`}
              </Text>
            ) : (
              <Text type="Caption" color="black" weight="semibold">
                🎉🎉 무료 배송이 가능합니다 🎉🎉
              </Text>
            )}
            <Progress
              value={progressValue}
              color={remainingForFreeShipping > 0 ? '#333333' : '#333333'}
            />
          </Flex>
          <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="10px"
            margin="10px 0 0 0"
          >
            <CheckBox checked={allChecked} onClick={onToggleAll} role="all-check" />
            <Text type="Caption" weight="regular">
              {`전체선택  (${selectedCartItemCount}/${cartItemCount})`}
            </Text>
          </Flex>
        </Flex>
        <CartListContainer>
          {cartItems?.map((item) => (
            <CartItemDetail
              key={item.id}
              onToggle={onToggle}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
              {...item}
            />
          ))}
        </CartListContainer>
        <PriceSummary cartItems={cartItems ?? []} />
      </>

      <Button
        width="100%"
        size="xl"
        shape="square"
        css={css`
          position: sticky;
        `}
        onClick={onNext}
        disabled={cartItems?.length === 0 || selectedCartItemCount === 0}
      >
        주문확인
      </Button>
    </>
  );
};
