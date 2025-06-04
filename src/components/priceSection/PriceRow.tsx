import styled from '@emotion/styled';

type PriceRowProps = {
  title: string;
  price: number;
};

const PriceRow = ({ title, price }: PriceRowProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Price data-testid={title}>{`${price.toLocaleString()}원`}</S.Price>
    </S.Container>
  );
};

export default PriceRow;

const S = {
  Container: styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  Title: styled.p`
    font-size: 16px;
    font-weight: 700;
  `,

  Price: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,
};
