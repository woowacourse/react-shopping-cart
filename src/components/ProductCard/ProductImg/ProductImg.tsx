import { memo } from 'react';
import styled from 'styled-components';

interface ProductImgProps {
  imageUrl: string;
}

const ProductImg = ({ imageUrl }: ProductImgProps) => {
  return <Styled.Img src={imageUrl} />;
};

const Styled = {
  Img: styled.img`
    width: 282px;
    height: 282px;

    cursor: pointer;
  `,
};
export default memo(ProductImg);
