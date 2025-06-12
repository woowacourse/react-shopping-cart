type MinimumAmountProps = {
  minimumAmount: number;
};

const MinimumAmount = ({ minimumAmount }: MinimumAmountProps) => {
  return <p>{`최소 구매 금액: ${minimumAmount.toLocaleString()}원`}</p>;
};
export default MinimumAmount;
