import { useParams } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
import useCart from "../../hooks/useCart";
import useProduct from "../../hooks/useProduct";
import * as S from "./index.styles";

const Detail = () => {
  const { id } = useParams();
  const { createNewCart } = useCart();
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
        {product?.isLoading || (
          <ItemDetails
            {...product?.data}
            onClickShoppingCartButton={() => {
              createNewCart(Number(id));
            }}
          />
        )}
      </S.DetailContainer>
    </S.DetailPageContainer>
  );
};

export default Detail;
