import { styled } from 'styled-components';

interface Props {
  price: number;
  size: 'small' | 'medium' | 'large';
  color: string;
}

export default function Price({ price = 0, size = 'medium', color = 'black' }: Partial<Props>) {
  return (
    <Style.Wrapper className={size} color={color}>
      {price.toLocaleString('ko-KR')}원
    </Style.Wrapper>
  );
}

const Style = {
  Wrapper: styled.p<Partial<Props>>`
    &.small {
      font-size: 10px;
    }

    &.medium {
      font-size: 16px;
    }

    &.large {
      font-size: 20px;
    }

    color: ${(props) => props.color};
  `,
};
