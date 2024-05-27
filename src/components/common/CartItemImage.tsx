import { css } from '@emotion/react';

interface CartItemImageProps {
  imageUrl: string;
  alt: string;
}

export default function CartItemImage({ imageUrl, alt }: CartItemImageProps) {
  return <img css={image} src={imageUrl} alt={alt} />;
}

const image = css`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;
