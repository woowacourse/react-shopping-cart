import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProductsAPI, ProductState, selectProductState } from "../../redux/modules/products";

import Product from "../../components/Product";
import Loader from "../../components/@shared/Loader";
import { ProductsWrapper } from "./styles";

function ProductList() {
  const { productList, loading, error }: ProductState = useSelector(selectProductState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsAPI());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ProductsWrapper>
      {productList.map((product) => (
        <Product key={product.id} productInfo={product} />
      ))}
    </ProductsWrapper>
  );
}

export default ProductList;
