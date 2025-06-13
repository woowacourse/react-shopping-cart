import * as S from "./OrderProduct.styles";
import { formatPrice } from "../../../../utils/formatPrice";
import Line from "../../../common/Line";
import { CartProduct } from "../../../../type/cart";

type Props = {
  item: CartProduct;
};

const OrderProduct = ({ item }: Props) => {
  const { name, price, imageUrl } = item.product;

  return (
    <>
      <Line />
      <S.CardInfoSection>
        <S.ImgSection
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = "./null-image.png")}
        />

        <S.ProductInfoSection>
          <S.ProductDescription>
            <S.ProductDescriptionTop>
              <S.ProductName>{name}</S.ProductName>
              <S.ProductPrice>{formatPrice(price)}</S.ProductPrice>
            </S.ProductDescriptionTop>

            <S.ProductQuantity>{item.quantity}개</S.ProductQuantity>
          </S.ProductDescription>
        </S.ProductInfoSection>
      </S.CardInfoSection>
    </>
  );
};

export default OrderProduct;
