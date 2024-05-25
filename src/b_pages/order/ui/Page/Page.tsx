import { BaseProductList } from '@/c_widgets/BaseProductList';
import { ContentHeader } from '@/c_widgets/ContentHeader';
import { LayoutHeader } from '@/c_widgets/LayoutHeader';
import { PaymentSummary } from '@/c_widgets/PaymentSummary';
import { PayOrderButton, ApplyCouponButton } from '@/d_features/order';
import { Layout } from '@/f_shared';

import { mockCarts } from '../../../../../mocks';
import { OrderItemCardCounter } from '../OrderItemCardCounter/OrderItemCardCounter';
import { OrderShippingInformation } from '../OrderShippingInformation/OrderShippingInformation';

import css from './Page.module.css';

// TODO: Connect to state/
export const OrderPage = () => {
  const carts = mockCarts.slice(0, 3); // temp

  return (
    <Layout
      headerSlot={<LayoutHeader middleSlotType='logo' />}
      contentHeaderSlot={
        <ContentHeader
          title={'주문확인'}
          desc={`총 1종류의 상품 2개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
        ></ContentHeader>
      }
      contentBodySlot={
        <div className={css.contentBodySlot}>
          <BaseProductList
            carts={carts}
            cardCounterSlot={(quantity: number) => <OrderItemCardCounter quantity={quantity} />}
          />
          <ApplyCouponButton />
          <OrderShippingInformation />
        </div>
      }
      contentFooterSlot={<PaymentSummary showCouponDiscountAmount />}
      footerSlot={<PayOrderButton />}
      gap={{ top: 36, bottom: 52 }}
    />
  );
};
