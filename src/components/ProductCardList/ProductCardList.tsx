import { useRecoilValue } from "recoil";
import { fetchedProductListSelector } from "../../store/fetchSelectors";
import ProductCard from "../ProductCard/ProductCard";
import Styled from "./ProductCardListStyled";

const ProductCardList = () => {
  const fetchedProductList = useRecoilValue(fetchedProductListSelector);

  return (
    <Styled.Container>
      {fetchedProductList.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </Styled.Container>
  );
};

export default ProductCardList;
