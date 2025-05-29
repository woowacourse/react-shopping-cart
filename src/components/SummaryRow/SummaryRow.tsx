import { priceLayout, summaryRowLayout, textLayout } from "./SummaryRow.style";

interface SummaryRowProps {
  text: string;
  price: number;
  dataTestId: string;
}

export function SummaryRow({ text, price, dataTestId }: SummaryRowProps) {
  return (
    <div css={summaryRowLayout}>
      <p css={textLayout}>{text}</p>
      <p css={priceLayout} data-testid={dataTestId}>
        {price.toLocaleString("ko")}원
      </p>
    </div>
  );
}
