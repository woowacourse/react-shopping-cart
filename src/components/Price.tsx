import { CSSProp, styled } from 'styled-components';

interface Props {
  price: number;
  css?: CSSProp;
}

const Price = ({ price, css }: Props) => {
  return (
    <S.Price css={css}>
      {price.toLocaleString()}
      <span>원</span>
    </S.Price>
  );
};

const S = {
  Price: styled.p<{ css?: CSSProp }>`
    font-size: 17px;
    letter-spacing: 0.5px;
    color: var(--text-color);

    ${(props) => props.css}

    & span {
      vertical-align: top;
    }

    @media (max-width: 1270px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `,
};

export default Price;
