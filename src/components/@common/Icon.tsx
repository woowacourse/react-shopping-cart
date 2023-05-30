import { MouseEventHandler, SVGProps } from 'react';
import { CSSProp, styled } from 'styled-components';

export interface Props extends SVGProps<SVGSVGElement> {
  width: string;
  height: string;
  color: string;
  path: string;
  viewBox: string;
  svgStyle?: CSSProp;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const Icon = ({ svgStyle, onClick, ...props }: Props) => {
  return (
    <S.Svg {...props} styled={svgStyle} onClick={onClick}>
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
