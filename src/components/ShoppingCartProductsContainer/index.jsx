import ShoppingCartProducts from "../ShoppingCartProducts";
import ShoppingCartProductsController from "../ShoppingCartProductsController";
import * as S from "./index.styles";

const ShoppingCartProductsContainer = ({
  products,
  handleAllChecked,
  isAllChecked,
  checkedProductIds,
  handleRemoveProducts,
}) => {
  return (
    <S.ShoppingCartProductsContainer>
      <ShoppingCartProductsController
        isAllChecked={isAllChecked}
        handleAllChecked={handleAllChecked}
        handleRemoveProducts={handleRemoveProducts}
      />
      <S.ProductsTotalQuantity>
        든든배송 상품 ({products.length}개)
      </S.ProductsTotalQuantity>
      <ShoppingCartProducts
        products={products}
        checkedProductIds={checkedProductIds}
      />
    </S.ShoppingCartProductsContainer>
  );
};

export default ShoppingCartProductsContainer;
