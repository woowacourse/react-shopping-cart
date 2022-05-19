import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
import useProduct from "../../hooks/useProduct";
import * as S from "./index.styles";

const Detail = () => {
  const { id } = useParams();

  const { product, getProductById } = useProduct();

  useEffect(() => {
    getProductById(Number(id));
  }, [id, getProductById]);

  return (
    <S.DetailPageContainer>
      <S.DetailContainer>
        {product.isLoading || <ItemDetails {...product.data} />}
      </S.DetailContainer>
    </S.DetailPageContainer>
  );
};

export default Detail;
