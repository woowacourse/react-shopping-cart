// CartPage.tsx
import { useRecoilValueLoadable } from 'recoil';

import { ContentHeader } from '@/c_widgets/ContentHeader';
import { LayoutHeader } from '@/c_widgets/LayoutHeader';
import { PaymentSummary } from '@/c_widgets/PaymentSummary';
import { OrderCartItemButton } from '@/d_features/cart';
import { cartItemCountState, cartItemsState } from '@/e_entities/cart';
import { Layout } from '@/f_shared';

import { CartItemList } from '../CartProductList/CartProductList';
import { EmptyCartMessage } from '../EmptyCartMessage/EmptyCartMessage';

export const CartPage = () => {
  const cartItemsLoadable = useRecoilValueLoadable(cartItemsState);
  const cartItemCountLoadable = useRecoilValueLoadable(cartItemCountState);

  if (cartItemsLoadable.state === 'loading' || cartItemCountLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (cartItemsLoadable.state === 'hasError' || cartItemCountLoadable.state === 'hasError') {
    return <div>Error loading cart data</div>;
  }

  const cartItems = cartItemsLoadable.contents;
  const cartItemCount = cartItemCountLoadable.contents;

  return (
    <Layout
      headerSlot={<LayoutHeader middleSlotType='logo' />}
      contentHeaderSlot={
        <ContentHeader title={'장바구니'} desc={`현재 ${cartItemCount}종류의 상품이 담겨있습니다.`}></ContentHeader>
      }
      contentBodySlot={cartItems.length === 0 ? <EmptyCartMessage /> : <CartItemList cartItems={cartItems} />}
      contentFooterSlot={<PaymentSummary />}
      footerSlot={<OrderCartItemButton />}
      gap={{ top: 36, bottom: 52 }}
    />
  );
};
