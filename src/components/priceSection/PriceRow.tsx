import styled from '@emotion/styled';

type PriceRowProps = {
  title: string;
  price: number;
};

const PriceRow = ({ title, price }: PriceRowProps) => {
  return (
    <S.Container >
      <p>{title}</p>
      <p data-testid={title}>{`${price.toLocaleString()}원`}</p>
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
};
