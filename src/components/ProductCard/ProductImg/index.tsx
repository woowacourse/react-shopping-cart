import { memo, ImgHTMLAttributes } from "react";
import styled from "styled-components";

const ProductImg = ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return <Styled.Img {...props} />;
};

const Styled = {
  Img: styled.img`
    width: 282px;
    height: 282px;

    cursor: pointer;
  `,
};
export default memo(ProductImg);
