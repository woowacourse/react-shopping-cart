import { CSSProp, styled } from 'styled-components';
import { IconProps } from '../../types';

const Icon = ({ svgStyle, ...props }: IconProps) => {
  return (
    <S.Svg {...props} styled={svgStyle}>
      <path d={props.path} />
    </S.Svg>
  );
};

const S = {
  Svg: styled.svg<{ styled?: CSSProp }>`
    ${(props) => props.styled}
  `,
};

export default Icon;
