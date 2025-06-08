import { PageTitle } from '@/components/common';

interface CartTitleProps {
  quantity?: number;
}

function CartTitle({ quantity = 0 }: CartTitleProps) {
  return (
    <PageTitle
      title="장바구니"
      description={
        quantity !== 0 ? `현재 ${quantity}종류의 상품이 담겨있습니다.` : null
      }
    />
  );
}

export default CartTitle;
