import { useRecoilState } from "recoil";
import { fetchedProductListAtom } from "../../store/fetchState";
import ProductCard from "../ProductCard/ProductCard";
import Styled from "./ProductCardListStyled";
import { useFetchProductList } from "../../hooks/useFetchProductList";

const ProductCardList = () => {
  const [fetchedProductList] = useRecoilState(fetchedProductListAtom);

  useFetchProductList();

  return (
    <Styled.Container>
      {fetchedProductList.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
    </Styled.Container>
  );
};

export default ProductCardList;
