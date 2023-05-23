import { SVGProps } from 'react';
import { CSSProp } from 'styled-components';

export interface IconProps extends SVGProps<SVGSVGElement> {
  css?: CSSProp;
  pathFill?: string;
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
  product: Product;
}
