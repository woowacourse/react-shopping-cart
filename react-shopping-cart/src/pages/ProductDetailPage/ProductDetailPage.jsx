import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductName from "../../component/@shared/ProductName/ProductName";
import ProductPrice from "../../component/@shared/ProductPrice/ProductPrice";
import ProductThumbnail from "../../component/@shared/ProductThumbnail/ProductThumbnail";
import { selectCurrentProducts } from "../../redux/products/products.selector";
import { ColumnFlexWrapper, RowFlexWrapper } from "../../styles/Wrapper";
import { selectCurrentCarts } from "../../redux/carts/carts.selector";
import { isInCart } from "../../util/check";
import useClickCartButton from "../../hooks/useClickCartButton";
import ShoppingCartButton from "../../component/ShoppingCartButton/ShoppingCartButton";

function ProductDetailPage() {
  const { idx } = useParams();
  const products = useSelector(selectCurrentProducts);
  const carts = useSelector(selectCurrentCarts);
  const { handleAddProduct, handleDeleteProduct } = useClickCartButton();

  const { name, image, price } = products.find(
    (product) => product.id === Number(idx)
  );

  const isCartItem = isInCart(idx, carts);

  return (
    <ColumnFlexWrapper gap="20px" width="425px" ml="auto" mr="auto">
      <ProductThumbnail type="detail" src={image} />
      <ProductName type="detail">{name}</ProductName>
      <RowFlexWrapper
        gap="300px"
        bt="2px"
        bColor="gray_01"
        width="100%"
        padding="15px 0px"
      >
        <div>금액</div>
        <ProductPrice type="detail">{price}원</ProductPrice>
      </RowFlexWrapper>
      <ShoppingCartButton
        $isincart={isCartItem}
        onClick={
          isCartItem
            ? (e) => handleDeleteProduct(e, idx)
            : (e) =>
                handleAddProduct(e, { name, price, id: idx, thumbnail: image })
        }
      >
        {isCartItem ? "장바구니에서 제거" : "장바구니에 추가"}
      </ShoppingCartButton>
    </ColumnFlexWrapper>
  );
}

export default ProductDetailPage;
