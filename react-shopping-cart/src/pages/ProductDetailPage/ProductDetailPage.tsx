import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import ProductName from "component/@shared/ProductName/ProductName";
import ProductPrice from "component/@shared/ProductPrice/ProductPrice";
import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import WithSpinner from "component/Wrapper/WithSpinner/WithSpinner";
import ShoppingCartButton from "component/ShoppingCart/ShoppingCartButton/ShoppingCartButton";

import {
  selectDetailProduct,
  selectProductsLoading,
} from "redux/products/products.selector";
import { fetchProductDetailStart } from "redux/products/products.action";
import { selectCartsLoading } from "redux/carts/carts.selector";

import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";

function ProductDetailPage() {
  const { idx } = useParams();
  const product = useSelector(selectDetailProduct);
  const cartsLoading = useSelector(selectCartsLoading);
  const productsLoading = useSelector(selectProductsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetailStart(Number(idx)));
  }, [dispatch, idx]);

  return (
    product && (
      <WithSpinner loading={cartsLoading || productsLoading}>
        <ColumnFlexWrapper gap="20px" width="425px" ml="auto" mr="auto">
          <ProductThumbnail type="detail" src={product.thumbnail} />
          <ProductName type="detail">{product.name}</ProductName>
          <RowFlexWrapper
            gap="300px"
            bt="2px"
            bColor="gray_01"
            width="100%"
            padding="15px 0px"
          >
            <div>금액</div>
            <ProductPrice type="detail">{product.price}원</ProductPrice>
          </RowFlexWrapper>
          <ShoppingCartButton idx={Number(idx)} />
        </ColumnFlexWrapper>
      </WithSpinner>
    )
  );
}

export default ProductDetailPage;
