import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { getCartItem } from '../../apis/cartItem';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import ShoppingCartSection from '../../components/ShoppingCartSection/ShoppingCartSection';
import { useAPI } from '../../context/APIContext';
import * as S from './ShoppingCartPage.styles';
import { useEffect, useRef } from 'react';
import { CartItemsResponse } from '../../types/cartItems';
import Text from '../../components/Text/Text';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ShoppingCartPage() {
  const { data, refetch } = useAPI<CartItemsResponse>({ fetcher: getCartItem, name: 'cartItem' });
  const navigate = useNavigate();

  const [selectedItemIds, setSelectedItemIds] = useLocalStorage<number[]>('selectedCartItemIds', []);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (data && !hasInitialized.current) {
      hasInitialized.current = true;
      const validIds = data.content.map((item) => item.id);
      const filtered = selectedItemIds.filter((id) => validIds.includes(id));
      if (filtered.length === 0) {
        setSelectedItemIds(validIds);
      } else {
        setSelectedItemIds(filtered);
      }
    }
  }, [data, selectedItemIds, setSelectedItemIds]);

  const handleNavigateClick = () => {
    const selectedItems = data?.content.filter((item) => selectedItemIds.includes(item.id));
    navigate('/confirm', { state: { selectedItems } });
  };

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
