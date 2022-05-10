import ProductThumbnail from "../@shared/ProductThumbnail/ProductThumbnail";
import ProductCardInfo from "../ProductCardInfo/ProductCardInfo";
import { ColumnFlexWrapper } from "../../styles/Wrapper";

function ProductCard({ name, price, thumbnail }) {
  return (
    <ColumnFlexWrapper>
      <ProductThumbnail src={thumbnail} type="card" />
      <ProductCardInfo name={name} price={price} />
    </ColumnFlexWrapper>
  );
}

export default ProductCard;
