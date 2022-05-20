import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, postCartProduct } from "../../modules/products";
import ProductDetails from "../../components/ProductDetails";
import ProductDetailsSkeleton from "../../components/ProductDetailsSkeleton";
import * as S from "./index.styles";

const ProductDetailsPage = () => {
  const [isCartIconClicked, setCartIconClicked] = useState(false);
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePutInShoppingCart = () => {
    dispatch(postCartProduct(Number(id), product));

    setCartIconClicked((prevState) => !prevState);
    setTimeout(() => {
      setCartIconClicked((prevState) => !prevState);
    }, 700);
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (product.error) navigate("/server-error");
  if (product.loading) return <ProductDetailsSkeleton />;

  return (
    <S.DetailPageContainer>
      <S.DetailContainer>
        <ProductDetails
          handlePutInShoppingCart={handlePutInShoppingCart}
          isCartIconClicked={isCartIconClicked}
          {...product.data}
        />
      </S.DetailContainer>
    </S.DetailPageContainer>
  );
};

export default ProductDetailsPage;
