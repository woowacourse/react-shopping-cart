import { useRecoilValue } from "recoil";
import useLocalCart from "../../hooks/useLocalCart";
import { fetchedProductListSelector } from "../../store/fetchSelectors";
import ProductCard from "../ProductCard/ProductCard";
import Styled from "./ProductCardListStyled";

const ProductCardList = () => {
  const fetchedProductList = useRecoilValue(fetchedProductListSelector);

  useLocalCart();
  return (
    <Styled.Container>
      {fetchedProductList.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </Styled.Container>
  );
};

export default ProductCardList;
