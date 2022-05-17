import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../modules/products";
import ProductDetails from "../../components/ProductDetails";
import ProductDetailsSkeleton from "../../components/ProductDetailsSkeleton";
import * as S from "./index.styles";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (product.error) navigate("/server-error");
  if (product.loading) return <ProductDetailsSkeleton />;

  return (
    <S.DetailPageContainer>
      <S.DetailContainer>
        <ProductDetails {...product.data} />
      </S.DetailContainer>
    </S.DetailPageContainer>
  );
};

export default ProductDetailsPage;
