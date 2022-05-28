import ShoppingCartProducts from "./ShoppingCartProducts";
import ShoppingCartProductsController from "./ShoppingCartProductsController";
import * as S from "./index.styles";

const ShoppingCartProductsContainer = ({
  products,
  onAllCheckedClick,
  isAllChecked,
  checkedProductIds,
  onRemoveAllItemClick,
}) => {
  return (
    <S.ShoppingCartProductsContainer>
      <ShoppingCartProductsController
        isAllChecked={isAllChecked}
        onAllCheckedClick={onAllCheckedClick}
        onRemoveAllItemClick={onRemoveAllItemClick}
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
