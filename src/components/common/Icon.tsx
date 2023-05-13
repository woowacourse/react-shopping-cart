import { CSSProp, styled } from 'styled-components';
import { IconProps } from '../../types';

const Icon = ({ css, ...props }: IconProps) => {
  return (
    <S.Svg {...props} css={css}>
      <path d={props.path} />
    </S.Svg>
  );
};

const S = {
  Svg: styled.svg<{ css?: CSSProp }>`
    ${(props) => props.css}
  `,
};

export default Icon;
