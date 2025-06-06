interface MinimumAmountProps {
  minimumAmount: number;
}

function MinimumAmount({ minimumAmount }: MinimumAmountProps) {
  return <p>최소 주문 금액: {minimumAmount.toLocaleString()}</p>;
}

export default MinimumAmount;
