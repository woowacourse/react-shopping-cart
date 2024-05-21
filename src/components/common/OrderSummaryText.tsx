type Props = {
  totalCategoryCount: number;
  totalOrderQuantity: number;
  className: string;
};

export default function OrderSummaryText({
  totalCategoryCount,
  totalOrderQuantity,
  className,
}: Props) {
  return (
    <div className={className}>
      <p>
        총 {totalCategoryCount}종류의 상품 {totalOrderQuantity}개를 주문합니다.
      </p>
      <p>최종 결제 금액을 확인해 주세요.</p>
    </div>
  );
}
