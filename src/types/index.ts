import { SVGProps } from 'react';
import { CSSProp } from 'styled-components';

export interface IconProps extends SVGProps<SVGSVGElement> {
  svgStyle?: CSSProp;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product[];
}
