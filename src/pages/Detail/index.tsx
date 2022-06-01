import { useParams } from "react-router-dom";
import ItemDetails from "../../components/Product/ItemDetails";
import useCartList from "../../hooks/Domain/useCartList";
import useProduct from "../../hooks/Domain/useProduct";
import { isProduct } from "../../types/product";
import * as S from "./index.styles";

const Detail = () => {
  const { id } = useParams();
  const { createNewCart } = useCartList();
  const { product } = useProduct(Number(id));

  if (product.isLoading || product.error) {
    return null;
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
