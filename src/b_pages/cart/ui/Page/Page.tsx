import { ContentHeader } from '@/c_widgets/ContentHeader';
import { LayoutHeader } from '@/c_widgets/LayoutHeader';
import { OrderCartButton } from '@/d_features/cart';
import { Layout } from '@/f_shared';

import { mockCarts } from '../../../../../mocks/index';
import { PaymentSummary } from '../../../../c_widgets/PaymentSummary/ui/PaymentSummary/PaymentSummary';
import { CartProductList } from '../CartProductList/CartProductList';

export const CartPage = () => {
  // TODO: Connect to state
  const cartItemCount = 2;
  // const cartItemCount = useRecoilValue(CartItemCountState);
  const carts = mockCarts;

  return (
    <Layout
      headerSlot={<LayoutHeader middleSlotType='logo' />}
      contentHeaderSlot={
        <ContentHeader title={'장바구니'} desc={`현재 ${cartItemCount}종류의 상품이 담겨있습니다.`}></ContentHeader>
      }
      contentBodySlot={<CartProductList carts={carts} />}
      contentFooterSlot={<PaymentSummary />}
      footerSlot={<OrderCartButton />}
      gap={{ top: 36, bottom: 52 }}
    />
  );
};
