import { useNavigate } from "react-router-dom";

import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import ProductCardInfo from "component/ProductList/ProductCardInfo/ProductCardInfo";
import { ProductCardBox } from "./ProductCard.style";

import { ROUTE_PATH } from "constants/index";
import { Product } from "type";

function ProductCard(props: Product) {
  const { id, thumbnail } = props;
  const navigate = useNavigate();

  return (
    <ProductCardBox onClick={() => navigate(`${ROUTE_PATH.DETAIL}/${id}`)}>
      <ProductThumbnail src={thumbnail} type="card" />
      <ProductCardInfo {...props} />
    </ProductCardBox>
  );
}

export default ProductCard;
