import * as S from './PriceTextBox.styled';

interface PriceTextBoxProps {
  title: string;
  price: number;
  testId?: string;
}

export function PriceTextBox({ title, price, testId }: PriceTextBoxProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Text data-testid={testId}>{price.toLocaleString()}원</S.Text>
    </S.Container>
  );
}
