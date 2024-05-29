import { priceDescription, priceText, priceWrapper } from './Receipt.styled';

interface ReceiptProps {
  title: string;
  price: number;
}

export default function Receipt({ title, price }: ReceiptProps) {
  return (
    <div css={priceWrapper}>
      <span css={priceDescription}>{title}</span>
      <span css={priceText}>{price.toLocaleString('ko-KR')}원</span>
    </div>
  );
}
