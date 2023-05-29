import { memo, ImgHTMLAttributes } from "react";
import empty from "../../assets/img/empty.jpg";
import Styled from "./ProductImgStyled";

interface ProductImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  theme: object;
}

const ProductImg = ({ theme, src = empty, ...props }: ProductImgProps) => {
  return <Styled.Img {...props} theme={theme} src={src} loading="lazy" />;
};

export default memo(ProductImg);
