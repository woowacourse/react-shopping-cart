import { DefaultCartImg } from "../../../constants/images";
import { ProductImage } from "./CartItemImage.styles";

interface CartItemImageProps {
  image: string;
}

export default function CartItemImage({ image }: CartItemImageProps) {
  return (
    <img
      css={ProductImage}
      src={image}
      alt="상품 이미지"
      onError={(error) => {
        error.currentTarget.src = DefaultCartImg;
      }}
    />
  );
}
