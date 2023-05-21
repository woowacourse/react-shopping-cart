import { useRecoilState } from "recoil";
import { fetchedProductListAtom } from "../../store/fetchState";
import ProductCard from "../ProductCard/ProductCard";
import Styled from "./ProductCardListStyled";

const ProductCardList = () => {
  const [fetchedProductList] = useRecoilState(fetchedProductListAtom);

  return (
    <Styled.Container>
      {fetchedProductList.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </Styled.Container>
  );
};

export default ProductCardList;
