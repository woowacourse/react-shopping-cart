import { css } from '@emotion/react';

interface ReceiptProps {
  description: string;
  price: number;
}

export default function Receipt({ description, price }: ReceiptProps) {
  return (
    <div css={priceWrapper}>
      <span css={priceDescription}>{description}</span>
      <span css={priceText}>{price.toLocaleString('ko-KR')}원</span>
    </div>
  );
}

const priceWrapper = css`
  display: flex;
  justify-content: space-between;
  height: 42px;
`;

const priceDescription = css`
  display: flex;
  align-items: center;

  height: 100%;
  font-size: 16px;
  font-weight: 700;
  color: #0a0d13;
`;

const priceText = css`
  display: flex;
  align-items: center;

  height: 100%;
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;
