import { PageTitle } from '@/components/common';

interface OrderCheckTitleProps {
  orderItemQuantity: number;
  totalProductQuantity: number;
}

function OrderCheckTitle({
  orderItemQuantity,
  totalProductQuantity,
}: OrderCheckTitleProps) {
  return (
    <PageTitle
      title="주문 확인"
      description={`총 ${orderItemQuantity}종류의 상품 ${totalProductQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`}
    />
  );
}

export default OrderCheckTitle;
