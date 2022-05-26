import { useParams } from "react-router-dom";
import ItemDetails from "../../components/Product/ItemDetails";
import useCartList from "../../hooks/useCartList";
import useProduct from "../../hooks/useProduct";
import { isProduct } from "../../types/product";
import * as S from "./index.styles";

const Detail = () => {
  const { id } = useParams();
  const { createNewCart } = useCartList();
  const { product } = useProduct(Number(id));

  if (product.isLoading) {
    return <div></div>;
  }
  if (product.error) {
    return <div></div>;
  }
  return (
    <S.DetailPageContainer>
      <S.DetailContainer>
        {product.isLoading || (
          <ItemDetails
            {...product.data}
            onClickShoppingCartButton={() => {
              if (isProduct(product.data)) {
                createNewCart(Number(id), product.data.price);
              }
            }}
          />
        )}
      </S.DetailContainer>
    </S.DetailPageContainer>
  );
};

export default Detail;
