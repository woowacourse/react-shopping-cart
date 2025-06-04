import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { getCartItem } from '../../apis/cartItem';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ShoppingCartSection from '../../components/ShoppingCartSection/ShoppingCartSection';
import { useAPI } from '../../context/APIContext';
import * as S from './ShoppingCartPage.styles';
import { useState } from 'react';
import { CartItemsResponse } from '../../types/cartItems';
import Text from '../../components/Text/Text';

export default function ShoppingCartPage() {
  const { data, isLoading, refetch } = useAPI<CartItemsResponse>({ fetcher: getCartItem, name: 'cartItem' });
  const navigate = useNavigate();
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const handleNavigateClick = () => {
    navigate('/completed', {
      state: {
        kind: selectedItemIds.length,
        quantity: selectedItemIds.reduce((prev, cur) => {
          const currentCartItem = data?.content.find((it) => it.id === cur);
          if (!currentCartItem) return prev;
          return prev + currentCartItem.quantity;
        }, 0),
        totalPrice: selectedItemIds.reduce((prev, cur) => {
          const currentCartItem = data?.content.find((it) => it.id === cur);
          if (!currentCartItem) return prev;
          return prev + currentCartItem.product.price * currentCartItem.quantity;
        }, 0),
      },
    });
  };
  if (isLoading) return <Text variant="title-1">로딩중입니다</Text>;
  if (!data) return <Text variant="title-1">데이터가 없습니다</Text>;
  return (
    <>
      <Header title="SHOP" />
      <ShoppingCartSection
        items={data}
        refetch={refetch}
        selectedItemIds={selectedItemIds}
        setSelectedItemIds={setSelectedItemIds}
      />
      <S.ButtonWrapper>
        <Button
          css={css`
            height: 48px;
          `}
          isDisabled={data?.content.length === 0}
          onClick={handleNavigateClick}
        >
          주문 확인
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
