import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../../constants";
import ACTION_TYPE from "../../../../redux/actions";
import createAction from "../../../../redux/createAction";
import S from "../../styled";
import ProductItem from "../product-item/ProductItem";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productList = useSelector(({ productList }) => productList);
  const dispatch = useDispatch();
  const getProductList = () => {
    return async (dispatch) => {
      const fetchResult = await fetch(`${API_URL}/products`);
      const productList = await fetchResult.json();
      setLoading(false);
      setError(null);
      dispatch(createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST, productList));
    };
  };

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <S.ProductList>
      {productList.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </S.ProductList>
  );
}

export default ProductList;
