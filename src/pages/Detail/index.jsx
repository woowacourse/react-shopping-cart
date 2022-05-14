import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
import { getProductById } from "../../modules/products";
import * as S from "./index.styles";

const Detail = () => {
  const { id } = useParams();

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (product.loading) return;

  return (
    <S.DetailPageContainer>
      <S.DetailContainer>
        <ItemDetails {...product.data} />
      </S.DetailContainer>
    </S.DetailPageContainer>
  );
};

export default Detail;
