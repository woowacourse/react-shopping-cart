import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductName from "../../component/@shared/ProductName/ProductName";
import ProductPrice from "../../component/@shared/ProductPrice/ProductPrice";
import ProductThumbnail from "../../component/@shared/ProductThumbnail/ProductThumbnail";
import {
  selectDetailProduct,
  selectProductsLoading,
} from "../../redux/products/products.selector";
import { ColumnFlexWrapper, RowFlexWrapper } from "../../styles/Wrapper";
import {
  selectCartsLoading,
  selectCurrentCarts,
} from "../../redux/carts/carts.selector";
import { isInCart } from "../../util/check";
import useClickCartButton from "../../hooks/useClickCartButton";
import ShoppingCartButton from "../../component/ShoppingCartButton/ShoppingCartButton";
import { CURRENT_USER } from "../../constants/index";
import { useEffect } from "react";
import { fetchProductDetailStart } from "../../redux/products/products.action";
import WithSpinner from "../../component/@shared/WithSpinner/WithSpinner";

function ProductDetailPage() {
  const { idx } = useParams();
  const product = useSelector(selectDetailProduct);
  const carts = useSelector(selectCurrentCarts);
  const cartsLoading = useSelector(selectCartsLoading);
  const productsLoading = useSelector(selectProductsLoading);

  const dispatch = useDispatch();
  const { handleAddProduct, handleDeleteProduct } = useClickCartButton();

  const isCartItem = isInCart(idx, carts);

  useEffect(() => {
    dispatch(fetchProductDetailStart(idx));
  }, [dispatch, idx]);

  return (
    product && (
      <WithSpinner loading={cartsLoading || productsLoading}>
        <ColumnFlexWrapper gap="20px" width="425px" ml="auto" mr="auto">
          <ProductThumbnail type="detail" src={product.image} />
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
          <ShoppingCartButton
            $isincart={isCartItem}
            onClick={
              isCartItem
                ? (e) => handleDeleteProduct(e, `${CURRENT_USER}${idx}`)
                : (e) =>
                    handleAddProduct(e, {
                      name: product.name,
                      price: product.price,
                      id: idx,
                      thumbnail: product.image,
                    })
            }
          >
            {isCartItem ? "장바구니에서 제거" : "장바구니에 추가"}
          </ShoppingCartButton>
        </ColumnFlexWrapper>
      </WithSpinner>
    )
  );
}

export default ProductDetailPage;
