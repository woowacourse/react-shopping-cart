import { styled } from 'styled-components';

interface Props {
  price: number;
  size: 'small' | 'medium' | 'large';
  color: string;
  tag?: string;
  label?: string;
}

export default function Price({
  price = 0,
  size = 'medium',
  color = 'black',
  tag = '',
  label = '',
}: Partial<Props>) {
  return (
    <Style.Wrapper className={size} color={color} aria-label={`${label} 가격 ${price}원`}>
      <span>{tag}</span>
      {price.toLocaleString('ko-KR')}원
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.p<Partial<Props>>`
    display: flex;
    justify-content: space-between;

    width: 100%;

    &.small {
      font-size: 10px;
    }

    &.medium {
      font-size: 16px;
    }

    &.large {
      font-size: 20px;
    }

    color: ${({ color }) => color};
  `,
};
