import { priceLayout, summaryRowLayout, textLayout } from "./SummaryRow.style";

interface SummaryRowProps {
  text: string;
  price: number;
}

export function SummaryRow({ text, price }: SummaryRowProps) {
  return (
    <div css={summaryRowLayout}>
      <p css={textLayout}>{text}</p>
      <p css={priceLayout}>{price.toLocaleString("ko")}원</p>
    </div>
  );
}
