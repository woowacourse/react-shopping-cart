import { SVGProps } from 'react';
import { CSSProp, styled } from 'styled-components';

export interface Props extends SVGProps<SVGSVGElement> {
  width: string;
  height: string;
  color: string;
  path: string;
  viewBox: string;
  svgStyle?: CSSProp;
}

const Icon = ({ svgStyle, ...props }: Props) => {
  return (
    <S.Svg {...props} styled={svgStyle}>
      <path d={props.path} fill={props.color} />
    </S.Svg>
  );
};

const S = {
  Svg: styled.svg<{ styled?: CSSProp }>`
    ${(props) => props.styled}
  `,
};

export default Icon;
