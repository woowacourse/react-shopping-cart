import * as S from './PriceBox.styled';
import { PriceTextBox } from './PriceTextBox/PriceTextBox';

interface PriceBoxProps {
  items: Array<{
    title: string;
    price: number;
    testId?: string;
  }>;
}

export default function PriceBox({ items }: PriceBoxProps) {
  return (
    <S.Container>
      {items.map((item, index) => (
        <PriceTextBox
          key={`${item.title}-${index}`}
          title={item.title}
          price={item.price}
          testId={item.testId}
        />
      ))}
    </S.Container>
  );
}
