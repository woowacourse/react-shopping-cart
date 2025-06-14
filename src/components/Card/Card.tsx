import Image from '../Image/Image';
import { ReactNode } from 'react';
import * as styles from './Card.styles';

export function Root({ children }: { children: ReactNode }) {
  return <div css={styles.cartItemInfoCss}>{children}</div>;
}

export function CardImage({ src, alt }: { src: string; alt: string }) {
  return <Image css={styles.cartItemImgCss} src={src} alt={alt}></Image>;
}

export function Content({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
export function Title({ children }: { children: ReactNode }) {
  return <h3 css={styles.cartTitleCss}> {children}</h3>;
}
export function Price({ children }: { children: ReactNode }) {
  return <p css={styles.cartItemPriceCss}> {children}</p>;
}
