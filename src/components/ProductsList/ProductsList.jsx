import React, { useEffect, useState } from "react";
import { MESSAGE } from "../../constants/constants";
import Product from "./Product/Product";
import * as S from "./ProductsList.styled";

const ProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.PUBLIC_URL}/data/data.json`);
        const { data } = await res.json();
        setProductsList(data);
      } catch {
        // eslint-disable-next-line no-alert
        window.alert(MESSAGE.ALERT.FAILED_GET_PRODUCT_LIST);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsList();
  }, []);

  return loading ? (
    <div>상품목록을 불러오는 중입니다</div>
  ) : (
    <S.ProductsList>
      {productsList.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </S.ProductsList>
  );
};

export default ProductsList;
