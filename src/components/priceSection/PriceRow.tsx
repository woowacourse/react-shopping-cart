import styled from '@emotion/styled';

type PriceRowProps = {
  title: string;
  price: number;
};

const PriceRow = ({ title, price }: PriceRowProps) => {
  return (
    <S.Container>
      <S.title>{title}</S.title>
      <S.price data-testid={title}>{`${price.toLocaleString()}원`}</S.price>
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

  title: styled.p`
    font-size: 16px;
    font-weight: 700;
  `,

  price: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,
};
