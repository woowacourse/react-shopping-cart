import { memo } from 'react';
import styled from 'styled-components';

interface ProductImgProps {
  imageUrl: string;
  size: { width: string; height: string };
}

const ProductImg = ({ imageUrl, size }: ProductImgProps) => {
  return <Img src={imageUrl} width={size.width} height={size.height} />;
};

const Img = styled.img<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  cursor: pointer;
`;

export default memo(ProductImg);
